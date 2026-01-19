# Azure Deployment Guide for Laptop Selling Website

This guide will help you deploy your full-stack application to Azure using your Azure for Students subscription.

## Architecture Overview
- **Frontend**: Azure Static Web Apps (Free tier for students)
- **Backend API**: Azure App Service (Free F1 tier)
- **Database**: Azure Database for PostgreSQL - Flexible Server (Burstable B1ms)
- **Storage**: Azure Blob Storage (already configured in your project)
- **Real-time**: Socket.io on App Service (WebSocket support included)

## Prerequisites
- Azure for Students account (https://azure.microsoft.com/en-us/free/students/)
- Azure CLI installed locally
- Git repository (GitHub recommended)

## Step 1: Install Azure CLI

```bash
# For Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Set your subscription (if you have multiple)
az account list --output table
az account set --subscription "Azure for Students"
```

## Step 2: Create Azure Resources

### 2.1 Create Resource Group
```bash
# Create a resource group in a region close to your customers
az group create \
  --name laptop-store-rg \
  --location eastasia
```

### 2.2 Create PostgreSQL Database
```bash
# Create PostgreSQL server (this may take 5-10 minutes)
az postgres flexible-server create \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --location eastasia \
  --admin-user adminuser \
  --admin-password "YourSecurePassword123!" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 14 \
  --public-access 0.0.0.0

# Create the database
az postgres flexible-server db create \
  --resource-group laptop-store-rg \
  --server-name laptop-store-db \
  --database-name laptop_store

# Get connection string
az postgres flexible-server show-connection-string \
  --server-name laptop-store-db \
  --database-name laptop_store \
  --admin-user adminuser \
  --admin-password "YourSecurePassword123!"
```

**Note**: Save the connection string. It will look like:
```
postgresql://adminuser:YourSecurePassword123!@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require
```

### 2.3 Configure Firewall Rules
```bash
# Allow Azure services to access the database
az postgres flexible-server firewall-rule create \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow your local IP for migration (replace with your IP)
az postgres flexible-server firewall-rule create \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --rule-name AllowMyIP \
  --start-ip-address YOUR_LOCAL_IP \
  --end-ip-address YOUR_LOCAL_IP
```

## Step 3: Migrate Local Database to Azure

### 3.1 Export local database
```bash
cd /home/hinatanguyen/Laptop-Selling-Website/server

# Export your local PostgreSQL database
pg_dump -h 127.0.0.1 -U hinatanguyen -d laptop_store \
  --no-owner --no-acl --clean --if-exists \
  -f backup.sql
```

### 3.2 Import to Azure PostgreSQL
```bash
# Import the database
psql "postgresql://adminuser:YourSecurePassword123!@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require" \
  -f backup.sql

# Verify the import
psql "postgresql://adminuser:YourSecurePassword123!@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require" \
  -c "SELECT COUNT(*) FROM products;"
```

## Step 4: Deploy Backend to Azure App Service

### 4.1 Create App Service Plan
```bash
az appservice plan create \
  --name laptop-store-plan \
  --resource-group laptop-store-rg \
  --sku F1 \
  --is-linux
```

### 4.2 Create Web App
```bash
az webapp create \
  --resource-group laptop-store-rg \
  --plan laptop-store-plan \
  --name laptop-store-api \
  --runtime "NODE:18-lts" \
  --deployment-local-git
```

### 4.3 Configure Environment Variables
```bash
# Get your app's name
APP_NAME="laptop-store-api"

# Set environment variables
az webapp config appsettings set \
  --resource-group laptop-store-rg \
  --name $APP_NAME \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    DATABASE_URL="postgresql://adminuser:YourSecurePassword123!@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require" \
    JWT_SECRET="your_super_secret_jwt_key_change_this_in_production_12345" \
    JWT_EXPIRES_IN="7d" \
    FRONTEND_URL="https://laptop-store-web.azurestaticapps.net" \
    AZURE_STORAGE_ACCOUNT_NAME="your_storage_account" \
    AZURE_STORAGE_ACCOUNT_KEY="your_storage_key" \
    AZURE_STORAGE_CONTAINER_NAME="product-images"

# Enable WebSocket support (required for Socket.io)
az webapp config set \
  --resource-group laptop-store-rg \
  --name $APP_NAME \
  --web-sockets-enabled true

# Enable CORS
az webapp cors add \
  --resource-group laptop-store-rg \
  --name $APP_NAME \
  --allowed-origins "https://laptop-store-web.azurestaticapps.net"
```

### 4.4 Deploy Backend Code

#### Option A: Deploy from Local Git
```bash
cd /home/hinatanguyen/Laptop-Selling-Website/server

# Get deployment credentials
az webapp deployment list-publishing-credentials \
  --resource-group laptop-store-rg \
  --name $APP_NAME

# Add Azure remote
git remote add azure https://laptop-store-api.scm.azurewebsites.net/laptop-store-api.git

# Deploy
git add .
git commit -m "Deploy to Azure"
git push azure main:master
```

#### Option B: Deploy from GitHub (Recommended)
```bash
# Link GitHub repository
az webapp deployment source config \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --repo-url https://github.com/YOUR_USERNAME/Laptop-Selling-Website \
  --branch main \
  --manual-integration
```

### 4.5 Configure Startup Command
```bash
# Set startup command to use the server directory
az webapp config set \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --startup-file "cd server && npm install && npm start"
```

## Step 5: Deploy Frontend to Azure Static Web Apps

### 5.1 Install Static Web Apps CLI
```bash
npm install -g @azure/static-web-apps-cli
```

### 5.2 Create Static Web App
```bash
az staticwebapp create \
  --name laptop-store-web \
  --resource-group laptop-store-rg \
  --location eastasia \
  --sku Free \
  --branch main \
  --app-location "/client" \
  --output-location "dist" \
  --login-with-github
```

### 5.3 Update Frontend Configuration

Create or update `/client/.env.production`:
```env
VITE_API_URL=https://laptop-store-api.azurewebsites.net/api
VITE_USD_TO_VND_RATE=24000
```

### 5.4 Configure Build Settings

Azure Static Web Apps will automatically detect your Vite configuration. Create `staticwebapp.config.json` in the client directory:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    }
  ],
  "globalHeaders": {
    "content-security-policy": "default-src 'self' https://laptop-store-api.azurewebsites.net"
  }
}
```

### 5.5 Deploy via GitHub Actions

Azure Static Web Apps will automatically create a GitHub Actions workflow. Check your repository for `.github/workflows/azure-static-web-apps-*.yml`.

## Step 6: Verify Deployment

### 6.1 Check Backend Health
```bash
# Test API endpoint
curl https://laptop-store-api.azurewebsites.net/api/products

# Check logs
az webapp log tail \
  --resource-group laptop-store-rg \
  --name laptop-store-api
```

### 6.2 Check Frontend
Visit: `https://laptop-store-web.azurestaticapps.net`

### 6.3 Test Full Flow
1. Browse products on the frontend
2. Add items to cart
3. Create an order
4. Check admin dashboard
5. Verify real-time notifications work

## Step 7: Configure Custom Domain (Optional)

### For Backend (App Service)
```bash
# Add custom domain
az webapp config hostname add \
  --resource-group laptop-store-rg \
  --webapp-name laptop-store-api \
  --hostname api.yourdomain.com

# Enable HTTPS
az webapp config ssl bind \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI
```

### For Frontend (Static Web Apps)
```bash
# Add custom domain
az staticwebapp hostname set \
  --name laptop-store-web \
  --resource-group laptop-store-rg \
  --hostname www.yourdomain.com
```

## Monitoring and Maintenance

### View Application Insights
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app laptop-store-insights \
  --location eastasia \
  --resource-group laptop-store-rg \
  --application-type web

# Link to App Service
az webapp config appsettings set \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$(az monitor app-insights component show --app laptop-store-insights --resource-group laptop-store-rg --query instrumentationKey -o tsv)
```

### Check Costs
```bash
# Monitor your spending
az consumption usage list \
  --start-date $(date -d "1 month ago" +%Y-%m-%d) \
  --end-date $(date +%Y-%m-%d)
```

### Scale Up/Down
```bash
# Scale App Service (if needed)
az appservice plan update \
  --name laptop-store-plan \
  --resource-group laptop-store-rg \
  --sku B1

# Scale database (if needed)
az postgres flexible-server update \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --sku-name Standard_B2s
```

## Troubleshooting

### Backend Issues
1. **Check logs**: `az webapp log tail -g laptop-store-rg -n laptop-store-api`
2. **SSH into container**: `az webapp ssh -g laptop-store-rg -n laptop-store-api`
3. **Restart app**: `az webapp restart -g laptop-store-rg -n laptop-store-api`

### Database Connection Issues
1. **Verify firewall rules**: Check that Azure services are allowed
2. **Test connection**: Use psql from your local machine
3. **Check SSL mode**: Ensure `?sslmode=require` is in connection string

### Frontend Issues
1. **Check build logs**: Go to GitHub Actions tab
2. **Environment variables**: Verify VITE_API_URL is correct
3. **CORS errors**: Add frontend URL to backend CORS config

## Cost Optimization Tips

1. **Use Free Tier**: App Service F1 (free), Static Web Apps (free)
2. **Database**: Use Burstable tier B1ms, stop when not in use
3. **Storage**: Azure Blob Storage pay-as-you-go is very cheap
4. **Monitor**: Set up budget alerts in Azure Portal

## Security Checklist

- [ ] Change default passwords in production
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS on custom domains
- [ ] Set up firewall rules properly
- [ ] Use Azure Key Vault for secrets (optional)
- [ ] Enable Application Insights for monitoring
- [ ] Set up automated backups for database
- [ ] Configure rate limiting properly

## Next Steps

1. Set up CI/CD pipeline with GitHub Actions
2. Configure automated database backups
3. Add monitoring and alerts
4. Set up staging environment
5. Configure CDN for static assets
6. Implement caching strategies

## Useful Commands

```bash
# View all resources
az resource list --resource-group laptop-store-rg --output table

# Delete everything (if needed)
az group delete --name laptop-store-rg --yes --no-wait

# Export resource group as template
az group export --name laptop-store-rg > template.json
```

## Support

- Azure Documentation: https://docs.microsoft.com/azure
- Azure for Students: https://azure.microsoft.com/free/students
- Azure Support: https://azure.microsoft.com/support
