#!/bin/bash
# Quick setup script for Azure Blob Storage

set -e  # Exit on error

echo "🚀 Azure Blob Storage Setup for Product Images"
echo "================================================"
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed"
    echo "Install it with: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    exit 1
fi

# Configuration
RESOURCE_GROUP="laptop-store-rg"
STORAGE_ACCOUNT="laptopstorestorage"
CONTAINER_NAME="product-images"
LOCATION="eastasia"

# Check if logged in
echo "🔐 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "Please login to Azure:"
    az login
fi

# Get current subscription
SUBSCRIPTION=$(az account show --query name -o tsv)
echo "✅ Using subscription: $SUBSCRIPTION"
echo ""

# Create storage account
echo "📦 Creating storage account: $STORAGE_ACCOUNT"
if az storage account show --name $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP &> /dev/null; then
    echo "   Storage account already exists"
else
    az storage account create \
        --name $STORAGE_ACCOUNT \
        --resource-group $RESOURCE_GROUP \
        --location $LOCATION \
        --sku Standard_LRS \
        --kind StorageV2 \
        --access-tier Hot \
        --allow-blob-public-access true
    echo "   ✅ Created storage account"
fi

# Get storage account key
echo ""
echo "🔑 Getting storage account key..."
STORAGE_KEY=$(az storage account keys list \
    --resource-group $RESOURCE_GROUP \
    --account-name $STORAGE_ACCOUNT \
    --query "[0].value" \
    --output tsv)
echo "   ✅ Retrieved storage key"

# Get connection string
CONN_STRING=$(az storage account show-connection-string \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --output tsv)

# Create container
echo ""
echo "📁 Creating container: $CONTAINER_NAME"
if az storage container exists \
    --name $CONTAINER_NAME \
    --connection-string "$CONN_STRING" \
    --query exists -o tsv | grep -q true; then
    echo "   Container already exists"
else
    az storage container create \
        --name $CONTAINER_NAME \
        --public-access blob \
        --connection-string "$CONN_STRING"
    echo "   ✅ Created container with public blob access"
fi

# Upload images
echo ""
echo "📸 Uploading images from local uploads folder..."
UPLOAD_DIR="./public/uploads"

if [ ! -d "$UPLOAD_DIR" ]; then
    echo "   ⚠️  Upload directory not found: $UPLOAD_DIR"
    echo "   Skipping image upload"
else
    IMAGE_COUNT=0
    for file in "$UPLOAD_DIR"/*.{jpg,jpeg,png,gif,webp}; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            az storage blob upload \
                --account-name $STORAGE_ACCOUNT \
                --container-name $CONTAINER_NAME \
                --name "$filename" \
                --file "$file" \
                --connection-string "$CONN_STRING" \
                --overwrite \
                --content-type "image/$(echo ${filename##*.} | sed 's/jpg/jpeg/')" \
                > /dev/null
            echo "   ✅ Uploaded: $filename"
            ((IMAGE_COUNT++))
        fi
    done
    echo "   📊 Total images uploaded: $IMAGE_COUNT"
fi

# Save configuration to .env
echo ""
echo "💾 Saving configuration to server/.env"
if [ -f "server/.env" ]; then
    # Backup existing .env
    cp server/.env server/.env.backup
    echo "   ✅ Backed up existing .env to .env.backup"
fi

# Check if variables already exist
if grep -q "AZURE_STORAGE_ACCOUNT" server/.env 2>/dev/null; then
    echo "   ⚠️  Azure storage variables already exist in .env"
    echo "   Please update them manually if needed"
else
    cat >> server/.env << EOF

# Azure Blob Storage Configuration
UPLOAD_PROVIDER=azure
AZURE_STORAGE_ACCOUNT=$STORAGE_ACCOUNT
AZURE_STORAGE_KEY=$STORAGE_KEY
AZURE_STORAGE_CONTAINER=$CONTAINER_NAME
EOF
    echo "   ✅ Added Azure storage configuration to .env"
fi

# Summary
echo ""
echo "================================================"
echo "✅ SETUP COMPLETE!"
echo "================================================"
echo ""
echo "📝 Configuration:"
echo "   Storage Account: $STORAGE_ACCOUNT"
echo "   Container: $CONTAINER_NAME"
echo "   Base URL: https://$STORAGE_ACCOUNT.blob.core.windows.net/$CONTAINER_NAME/"
echo ""
echo "🔄 NEXT STEPS:"
echo ""
echo "1. Update database image URLs:"
echo "   cd server"
echo "   node scripts/update-db-image-urls.js"
echo ""
echo "2. Configure Azure App Service (if not done already):"
echo "   az webapp config appsettings set \\"
echo "     --resource-group $RESOURCE_GROUP \\"
echo "     --name YOUR_APP_SERVICE_NAME \\"
echo "     --settings \\"
echo "     UPLOAD_PROVIDER=azure \\"
echo "     AZURE_STORAGE_ACCOUNT=$STORAGE_ACCOUNT \\"
echo "     AZURE_STORAGE_KEY=\"$STORAGE_KEY\" \\"
echo "     AZURE_STORAGE_CONTAINER=$CONTAINER_NAME"
echo ""
echo "3. Redeploy your application to Azure"
echo ""
echo "4. Test by uploading a new product image in the admin panel"
echo ""
echo "================================================"
