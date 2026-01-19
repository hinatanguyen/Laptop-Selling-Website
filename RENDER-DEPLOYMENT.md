# Render.com Deployment Guide for Backend API

## Quick Setup

### 1. Create Render Account
- Go to https://render.com
- Sign up with your GitHub account

### 2. Deploy Backend

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/hinatanguyen/Laptop-Selling-Website`
   - Select the `dev` branch

2. **Configure Service**
   ```
   Name: laptop-store-api
   Region: Singapore (closest to East Asia)
   Branch: dev
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: node src/server.js
   Instance Type: Free
   ```

3. **Environment Variables**
   Add these in the Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://adminuser:Admin12345@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require
   JWT_SECRET=zyff8aZ/20HbTTTRKFvTyUbOM/JEYK73eNCPqHgEFwA=
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://mango-desert-0c82ffb00.4.azurestaticapps.net
   ```

4. **Create Service**
   - Click "Create Web Service"
   - Wait 5-10 minutes for initial deployment

### 3. Update Frontend

Your Render URL will be: `https://laptop-store-api.onrender.com`

Update the Static Web App environment variables:
1. Go to Azure Portal → laptop-store-web → Configuration
2. Add/Update:
   ```
   VITE_API_URL=https://laptop-store-api.onrender.com/api
   ```

### 4. Connect Database

Your Azure PostgreSQL database is already configured and has all your data (116 products).
Render will connect using the DATABASE_URL environment variable.

## Cost Summary

- **Backend (Render.com)**: FREE
- **Frontend (Azure Static Web Apps)**: FREE  
- **Database (Azure PostgreSQL)**: ~$12-15/month
- **Total**: ~$12-15/month

## Notes

- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-50 seconds
- Upgrade to Starter ($7/month) for always-on service
- You can delete the Azure App Service to save costs

## Delete Unused Azure Resources

To clean up the problematic App Service:
```bash
# Delete App Service (keep database and frontend)
az webapp delete --resource-group laptop-store-rg --name laptop-store-api

# Delete App Service Plan (save $13/month)
az appservice plan delete --resource-group laptop-store-rg --name laptop-store-plan
```

This will reduce your Azure costs to just $12-15/month for the database!
