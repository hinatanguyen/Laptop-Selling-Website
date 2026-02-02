# Fix Production Images - Quick Guide

## Problem
Your images work locally (`/uploads/` folder) but don't show in production because:
1. The `uploads/` folder is in `.gitignore` (correct - shouldn't be in Git)
2. Azure App Service doesn't have these local files
3. Production needs to use Azure Blob Storage for persistent image hosting

## Solution: 3 Simple Steps

### Step 1: Create Azure Blob Storage (One-Time Setup)

Run the automated setup script from the root directory:

```bash
cd /home/hinatanguyen/Laptop-Selling-Website
./setup-azure-storage.sh
```

This script will:
- ✅ Create Azure Storage Account (`laptopstorestorage`)
- ✅ Create container (`product-images`)
- ✅ Upload all images from `server/public/uploads/`
- ✅ Update your `server/.env` with Azure credentials

**Alternative: Manual Setup**
If the script doesn't work, follow the detailed guide in [SETUP-AZURE-STORAGE.md](SETUP-AZURE-STORAGE.md)

### Step 2: Update Database URLs

After images are uploaded to Azure, update your database to use Azure URLs instead of local paths:

```bash
cd server
npm run azure:update-db
```

This will change all URLs from:
- ❌ `/uploads/product-123.jpg`
- ✅ `https://laptopstorestorage.blob.core.windows.net/product-images/product-123.jpg`

### Step 3: Configure Azure App Service

Add these environment variables to your Azure App Service:

**Via Azure Portal:**
1. Go to Azure Portal → Your App Service → Configuration → Application Settings
2. Add these settings:
   ```
   UPLOAD_PROVIDER = azure
   AZURE_STORAGE_ACCOUNT = laptopstorestorage
   AZURE_STORAGE_KEY = (get from Azure Portal or setup script output)
   AZURE_STORAGE_CONTAINER = product-images
   ```
3. Click "Save" and restart the app

**Via Azure CLI:**
```bash
az webapp config appsettings set \
  --resource-group laptop-store-rg \
  --name YOUR_APP_SERVICE_NAME \
  --settings \
  UPLOAD_PROVIDER=azure \
  AZURE_STORAGE_ACCOUNT=laptopstorestorage \
  AZURE_STORAGE_KEY="YOUR_KEY_HERE" \
  AZURE_STORAGE_CONTAINER=product-images
```

**Get your storage key:**
```bash
az storage account keys list \
  --resource-group laptop-store-rg \
  --account-name laptopstorestorage \
  --query "[0].value" \
  --output tsv
```

### Step 4: Verify Everything Works

1. **Check your website** - All product images should now display
2. **Upload a test image** - Login as admin, upload a new product image
3. **Check the URL** - It should be `https://laptopstorestorage.blob.core.windows.net/...`

## File Structure

```
/home/hinatanguyen/Laptop-Selling-Website/
├── setup-azure-storage.sh              # Automated setup script
├── SETUP-AZURE-STORAGE.md              # Detailed manual guide
├── FIX-PRODUCTION-IMAGES.md            # This file (quick guide)
└── server/
    ├── .env                            # Updated with Azure config
    ├── package.json                    # Added npm scripts
    └── scripts/
        ├── upload-images-to-azure.js   # Upload local images to Azure
        ├── update-db-image-urls.js     # Update database URLs
        └── update-image-urls.sql       # SQL queries (for reference)
```

## Available npm Scripts

```bash
# Upload local images to Azure Blob Storage
npm run azure:upload-images

# Update database image URLs from local to Azure
npm run azure:update-db
```

## Troubleshooting

### Images still not showing?
1. Check Azure Storage Account exists: Azure Portal → Storage Accounts
2. Verify container has public access: Container → Access Level = "Blob"
3. Check App Service environment variables are set correctly
4. Check database URLs were updated: Run query `SELECT image_url FROM products LIMIT 5;`

### "Missing Azure Storage credentials" error?
- Make sure `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_KEY` are set in `.env`
- For production, set them in Azure App Service environment variables

### How to re-upload images?
```bash
cd server
npm run azure:upload-images
```

### How to manually check/fix database?
```bash
# Connect to your Azure PostgreSQL database
psql "$DATABASE_URL"

# Check current URLs
SELECT id, name, image_url FROM products LIMIT 10;

# Run update script
npm run azure:update-db
```

## Costs
- Azure Blob Storage: ~$0.02/GB/month
- First 5GB bandwidth free
- Estimated cost for 100 product images: < $1/month

## How It Works

### Before (Local Development)
```
Client Request → /uploads/image.jpg
              ↓
Server serves from → server/public/uploads/image.jpg
```

### After (Production)
```
Client Request → https://laptopstorestorage.blob.core.windows.net/product-images/image.jpg
              ↓
Azure Blob Storage → Returns image directly
```

### Benefits
- ✅ Images persist across deployments
- ✅ Faster image loading (Azure CDN)
- ✅ Scalable storage
- ✅ No need to backup/manage uploads folder
- ✅ Same code works locally and in production

## Need Help?

1. **Setup Issues**: See [SETUP-AZURE-STORAGE.md](SETUP-AZURE-STORAGE.md)
2. **Azure CLI Help**: `az storage --help`
3. **Check script logs**: Scripts provide detailed output

## Summary Checklist

- [ ] Run `./setup-azure-storage.sh` (or manual setup)
- [ ] Run `npm run azure:update-db` to update database
- [ ] Add environment variables to Azure App Service
- [ ] Restart Azure App Service
- [ ] Verify images display on production website
- [ ] Test uploading new images as admin

Done! Your images should now work in production. 🎉
