# Render Backend - Azure Storage Setup Guide

## Problem
Image uploads fail in production because the backend needs Azure Storage credentials to upload product images.

## Solution

### Step 1: Add Environment Variables to Render

Go to your Render dashboard → Your backend service → Environment tab, and add these variables:

```bash
# Azure Storage Configuration
UPLOAD_PROVIDER=azure
AZURE_STORAGE_ACCOUNT=your_storage_account_name
AZURE_STORAGE_KEY=your_storage_access_key
AZURE_STORAGE_CONTAINER=product-images

# OR use connection string instead:
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=your_account;AccountKey=your_key;EndpointSuffix=core.windows.net
```

### Step 2: Get Azure Storage Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Storage Account
3. In the left menu, click on "Access keys"
4. Copy either:
   - **Connection string** (Option 1 - Easier)
   - **Storage account name** + **Key** (Option 2)

### Step 3: Verify Container Settings

Make sure your Azure blob container has public access enabled:

```bash
# Container name: product-images
# Public access level: Blob (anonymous read access for blobs only)
```

You can set this in Azure Portal:
1. Storage Account → Containers → product-images
2. Click "Change access level"
3. Select "Blob (anonymous read access for blobs only)"

### Step 4: Redeploy Render Backend

After adding the environment variables:
1. Render will automatically redeploy
2. OR manually trigger a redeploy from the Render dashboard

### Step 5: Test Upload

1. Go to your admin products page
2. Try uploading an image
3. Check browser console for any errors
4. Verify the image URL starts with `https://your_account.blob.core.windows.net/`

## Troubleshooting

### If uploads still fail:

1. **Check Render logs** for error messages:
   - Dashboard → Your service → Logs
   - Look for errors like "Azure Storage credentials missing"

2. **Verify CORS settings** on Azure Storage:
   ```
   Allowed origins: * or your frontend domain
   Allowed methods: GET, PUT, POST
   Allowed headers: *
   Max age: 3600
   ```

3. **Check Container exists**:
   - The code creates it automatically if `createIfNotExists()` works
   - But verify in Azure Portal that "product-images" container exists

4. **Test Azure credentials locally**:
   ```bash
   # In server directory
   export UPLOAD_PROVIDER=azure
   export AZURE_STORAGE_CONNECTION_STRING="your_connection_string"
   npm run dev
   ```

## Environment Variable Quick Reference

| Variable | Required | Example |
|----------|----------|---------|
| `UPLOAD_PROVIDER` | Yes | `azure` |
| `AZURE_STORAGE_CONNECTION_STRING` | Option 1 | `DefaultEndpointsProtocol=https;AccountName=...` |
| `AZURE_STORAGE_ACCOUNT` | Option 2 | `mystorageaccount` |
| `AZURE_STORAGE_KEY` | Option 2 | `abc123...` |
| `AZURE_STORAGE_CONTAINER` | Optional | `product-images` (default) |

## What Was Fixed

1. **Frontend code** ([Products.jsx](client/src/pages/admin/Products.jsx#L120-L135)):
   - Now correctly handles both Azure URLs (full https://) and local paths
   - Previously hardcoded `http://localhost:5000` which broke Azure URLs

2. **Backend code** already supports Azure Storage via [azureStorage.js](server/src/services/azureStorage.js)
   - Just needs environment variables configured on Render
