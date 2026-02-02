#!/bin/bash

# Azure Storage CORS Configuration Script
# This allows your frontend to display images stored in Azure Blob Storage

echo "🔧 Setting up CORS for Azure Storage..."

# Read from azure-credentials.txt or prompt user
if [ -f "azure-credentials.txt" ]; then
  source azure-credentials.txt
fi

# Prompt for storage account name if not set
if [ -z "$AZURE_STORAGE_ACCOUNT" ]; then
  echo "Enter your Azure Storage Account name (e.g., laptopstorestorage):"
  read AZURE_STORAGE_ACCOUNT
fi

# Prompt for connection string if not set
if [ -z "$AZURE_STORAGE_CONNECTION_STRING" ]; then
  echo "Enter your Azure Storage Connection String:"
  read -s AZURE_STORAGE_CONNECTION_STRING
  echo
fi

# Set CORS rules
echo "📡 Configuring CORS rules..."

az storage cors add \
  --services b \
  --methods GET HEAD POST PUT OPTIONS \
  --origins "*" \
  --allowed-headers "*" \
  --exposed-headers "*" \
  --max-age 3600 \
  --connection-string "$AZURE_STORAGE_CONNECTION_STRING"

if [ $? -eq 0 ]; then
  echo "✅ CORS configured successfully!"
  echo ""
  echo "Your images should now be visible in the admin panel."
  echo "Try refreshing the page!"
else
  echo "❌ Failed to configure CORS"
  echo ""
  echo "Manual steps:"
  echo "1. Go to Azure Portal"
  echo "2. Navigate to your Storage Account: $AZURE_STORAGE_ACCOUNT"
  echo "3. Settings → Resource sharing (CORS)"
  echo "4. Under 'Blob service' tab, add:"
  echo "   - Allowed origins: *"
  echo "   - Allowed methods: GET, HEAD, POST, PUT, OPTIONS"
  echo "   - Allowed headers: *"
  echo "   - Exposed headers: *"
  echo "   - Max age: 3600"
  echo "5. Click Save"
fi
