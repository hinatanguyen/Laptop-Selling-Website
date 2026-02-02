# 🔧 Image Upload Fix - Action Checklist

## ✅ What Has Been Fixed

1. **Frontend Image URL Handling** - [Products.jsx](client/src/pages/admin/Products.jsx#L120-L135)
   - Fixed hardcoded localhost URL that broke Azure blob URLs
   - Now correctly detects if URL is already full path (Azure) or relative path (local)

2. **CORS Configuration** - [server.js](server/src/server.js#L52-L75)
   - Improved production CORS handling
   - Better security in production environment

## 🚀 Required Actions on Render

### 1. Add Environment Variables

Go to Render Dashboard → Your Backend Service → Environment:

**Required:**
```
UPLOAD_PROVIDER=azure
```

**Option A - Using Connection String (Recommended):**
```
AZURE_STORAGE_CONNECTION_STRING=<your-connection-string>
```

**Option B - Using Account + Key:**
```
AZURE_STORAGE_ACCOUNT=<your-account-name>
AZURE_STORAGE_KEY=<your-access-key>
```

**Optional:**
```
AZURE_STORAGE_CONTAINER=product-images
FRONTEND_URL=https://your-frontend-domain.azurewebsites.net
NODE_ENV=production
```

### 2. Get Azure Credentials

From Azure Portal:
1. Go to your Storage Account
2. Settings → Access keys
3. Copy **Connection string** from key1 or key2

### 3. Verify Azure Container

1. Azure Portal → Storage Account → Containers
2. Find or create: `product-images`
3. Set Public access level: **Blob** (anonymous read access)

### 4. Deploy Changes

**Deploy Frontend:**
```bash
cd client
npm run build
# Deploy to Azure Static Web Apps
```

**Deploy Backend:**
```bash
# Commit and push changes
git add .
git commit -m "Fix image upload for Azure Storage"
git push
# Render will auto-deploy
```

## 🧪 Testing

After deployment:

1. **Test Upload:**
   - Go to Admin → Products
   - Click "Add Product" or edit existing
   - Upload an image
   - Should see success toast notification

2. **Verify Image URL:**
   - Open browser console
   - Check the uploaded image URL starts with:
     `https://<your-account>.blob.core.windows.net/product-images/`

3. **Check Logs:**
   - Render Dashboard → Logs
   - Look for any Azure-related errors

## 🐛 Troubleshooting

### Error: "Failed to upload image"

**Check Browser Console:**
- Press F12 → Console tab
- Look for specific error message

**Common Issues:**

1. **401 Unauthorized:**
   - Check token is valid
   - Try logging out and back in

2. **500 Server Error:**
   - Check Render logs
   - Verify Azure credentials are set correctly
   - Ensure credentials have no extra spaces

3. **CORS Error:**
   - Verify `FRONTEND_URL` matches your actual frontend domain
   - Check Azure CORS settings (if accessing blobs directly)

4. **Azure Credentials Missing:**
   - Render logs will show: "Azure Storage credentials missing"
   - Double-check environment variables are saved on Render
   - Redeploy after adding variables

### Still Not Working?

**Check Render Environment Variables:**
```bash
# In Render Dashboard → Environment
# Make sure these exist and have values:
UPLOAD_PROVIDER = azure
AZURE_STORAGE_CONNECTION_STRING = (has value)
```

**Test Locally First:**
```bash
# In server directory
export UPLOAD_PROVIDER=azure
export AZURE_STORAGE_CONNECTION_STRING="<your-connection-string>"
npm run dev

# Then test upload from local frontend
```

## 📝 Related Files

- [RENDER-AZURE-SETUP.md](RENDER-AZURE-SETUP.md) - Detailed setup guide
- [Products.jsx](client/src/pages/admin/Products.jsx) - Fixed frontend upload code
- [upload.js](server/src/routes/upload.js) - Backend upload route
- [azureStorage.js](server/src/services/azureStorage.js) - Azure integration
- [server.js](server/src/server.js) - CORS configuration

## 💡 Need Help?

Check Render logs for specific error messages:
```
Render Dashboard → Your Service → Logs (tab)
```
