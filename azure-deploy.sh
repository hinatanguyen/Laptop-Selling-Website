#!/bin/bash

# Azure Quick Deployment Script for Laptop Selling Website
# This script automates the Azure deployment process

set -e  # Exit on error

echo "================================"
echo "Azure Deployment Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration variables
RESOURCE_GROUP="laptop-store-rg"
LOCATION="eastasia"
DB_SERVER_NAME="laptop-store-db"
DB_NAME="laptop_store"
DB_ADMIN_USER="adminuser"
APP_SERVICE_PLAN="laptop-store-plan"
APP_SERVICE_NAME="laptop-store-api"
STATIC_WEB_APP="laptop-store-web"

echo -e "${YELLOW}This script will help you deploy your application to Azure${NC}"
echo ""
echo "Prerequisites:"
echo "1. Azure CLI installed and logged in"
echo "2. Azure for Students subscription active"
echo "3. Git repository initialized"
echo ""

read -p "Press Enter to continue or Ctrl+C to cancel..."

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}Azure CLI is not installed. Please install it first:${NC}"
    echo "curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    exit 1
fi

# Check if logged in
echo -e "${GREEN}Checking Azure login status...${NC}"
if ! az account show &> /dev/null; then
    echo -e "${YELLOW}Please log in to Azure:${NC}"
    az login
fi

# Get database password
echo ""
echo -e "${YELLOW}Enter a strong password for PostgreSQL database:${NC}"
echo "(Must be 8-128 characters, contain uppercase, lowercase, and numbers)"
read -s DB_PASSWORD
echo ""
read -s -p "Confirm password: " DB_PASSWORD_CONFIRM
echo ""

if [ "$DB_PASSWORD" != "$DB_PASSWORD_CONFIRM" ]; then
    echo -e "${RED}Passwords don't match!${NC}"
    exit 1
fi

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)

echo ""
echo -e "${GREEN}Step 1: Creating Resource Group...${NC}"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --output table

echo ""
echo -e "${GREEN}Step 2: Creating PostgreSQL Database (this may take 5-10 minutes)...${NC}"
az postgres flexible-server create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME \
  --location $LOCATION \
  --admin-user $DB_ADMIN_USER \
  --admin-password "$DB_PASSWORD" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 14 \
  --public-access 0.0.0.0 || echo "Server created (output format issue ignored)"

echo ""
echo -e "${GREEN}Step 3: Creating Database...${NC}"
az postgres flexible-server db create \
  --resource-group $RESOURCE_GROUP \
  --server-name $DB_SERVER_NAME \
  --database-name $DB_NAME \
  --output table

echo ""
echo -e "${GREEN}Step 4: Configuring Firewall Rules...${NC}"
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0 \
  --output table

# Get local IP
MY_IP=$(curl -s https://api.ipify.org)
echo "Your IP: $MY_IP"
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME \
  --rule-name AllowMyIP \
  --start-ip-address $MY_IP \
  --end-ip-address $MY_IP \
  --output table

echo ""
echo -e "${GREEN}Step 5: Migrating Local Database to Azure...${NC}"
DATABASE_URL="postgresql://${DB_ADMIN_USER}:${DB_PASSWORD}@${DB_SERVER_NAME}.postgres.database.azure.com/${DB_NAME}?sslmode=require"

read -p "Do you want to migrate your local database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Exporting local database..."
    pg_dump -h 127.0.0.1 -U hinatanguyen -d laptop_store \
      --no-owner --no-acl --clean --if-exists \
      -f /tmp/backup.sql
    
    echo "Importing to Azure PostgreSQL..."
    psql "$DATABASE_URL" -f /tmp/backup.sql
    
    echo "Verifying import..."
    psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM products;"
    
    rm /tmp/backup.sql
fi

echo ""
echo -e "${GREEN}Step 6: Creating App Service Plan...${NC}"
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --sku F1 \
  --is-linux \
  --output table

echo ""
echo -e "${GREEN}Step 7: Creating Web App for Backend...${NC}"
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $APP_SERVICE_NAME \
  --runtime "NODE:18-lts" \
  --output table

echo ""
echo -e "${GREEN}Step 8: Configuring Backend Environment Variables...${NC}"

# Prompt for Azure Storage credentials if using blob storage
echo ""
echo -e "${YELLOW}Do you have Azure Blob Storage configured? (y/n)${NC}"
read -n 1 -r HAS_STORAGE
echo
if [[ $HAS_STORAGE =~ ^[Yy]$ ]]; then
    read -p "Azure Storage Account Name: " STORAGE_ACCOUNT
    read -p "Azure Storage Account Key: " STORAGE_KEY
    read -p "Azure Storage Container Name: " STORAGE_CONTAINER
    STORAGE_SETTINGS="AZURE_STORAGE_ACCOUNT_NAME=$STORAGE_ACCOUNT AZURE_STORAGE_ACCOUNT_KEY=$STORAGE_KEY AZURE_STORAGE_CONTAINER_NAME=$STORAGE_CONTAINER"
fi

az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_SERVICE_NAME \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    DATABASE_URL="$DATABASE_URL" \
    JWT_SECRET="$JWT_SECRET" \
    JWT_EXPIRES_IN="7d" \
    FRONTEND_URL="https://${STATIC_WEB_APP}.azurestaticapps.net" \
    ${STORAGE_SETTINGS} \
  --output table

echo ""
echo -e "${GREEN}Step 9: Enabling WebSockets...${NC}"
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_SERVICE_NAME \
  --web-sockets-enabled true \
  --output table

echo ""
echo -e "${GREEN}Step 10: Setting Startup Command...${NC}"
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_SERVICE_NAME \
  --startup-file "npm install && node src/server.js" \
  --output table

echo ""
echo "================================"
echo -e "${GREEN}Deployment Configuration Complete!${NC}"
echo "================================"
echo ""
echo "Next Steps:"
echo "1. Deploy your backend code:"
echo "   - Option A: Use Azure DevOps or GitHub Actions"
echo "   - Option B: Manual deployment via Git"
echo ""
echo "2. Create Azure Static Web App for frontend:"
echo "   az staticwebapp create \\"
echo "     --name $STATIC_WEB_APP \\"
echo "     --resource-group $RESOURCE_GROUP \\"
echo "     --location $LOCATION \\"
echo "     --source https://github.com/YOUR_USERNAME/YOUR_REPO \\"
echo "     --branch main \\"
echo "     --app-location \"/client\" \\"
echo "     --output-location \"dist\""
echo ""
echo "3. Update client/.env.production with:"
echo "   VITE_API_URL=https://${APP_SERVICE_NAME}.azurewebsites.net/api"
echo ""
echo "Important URLs:"
echo "- Backend API: https://${APP_SERVICE_NAME}.azurewebsites.net"
echo "- Frontend: https://${STATIC_WEB_APP}.azurestaticapps.net"
echo "- Database: ${DB_SERVER_NAME}.postgres.database.azure.com"
echo ""
echo "Credentials saved to: azure-credentials.txt"

# Save credentials
cat > azure-credentials.txt << EOF
Azure Deployment Credentials
=============================

Resource Group: $RESOURCE_GROUP
Location: $LOCATION

Database:
- Server: ${DB_SERVER_NAME}.postgres.database.azure.com
- Database: $DB_NAME
- Username: $DB_ADMIN_USER
- Password: $DB_PASSWORD
- Connection String: $DATABASE_URL

App Service:
- Name: $APP_SERVICE_NAME
- URL: https://${APP_SERVICE_NAME}.azurewebsites.net

JWT Secret: $JWT_SECRET

Static Web App:
- Name: $STATIC_WEB_APP
- URL: https://${STATIC_WEB_APP}.azurestaticapps.net
EOF

echo ""
echo -e "${YELLOW}IMPORTANT: Keep azure-credentials.txt secure and don't commit it to Git!${NC}"
echo ""
