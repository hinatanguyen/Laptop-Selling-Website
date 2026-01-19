# 🚀 Quick Start Guide: Deploy to Azure

This guide will help you deploy your Laptop Selling Website to Azure quickly using your Azure for Students subscription.

## 📋 Prerequisites

Before starting, ensure you have:

1. ✅ **Azure for Students Account**
   - Sign up at: https://azure.microsoft.com/free/students/
   - $100 credit + free services

2. ✅ **Azure CLI Installed**
   ```bash
   # For Linux (Ubuntu/Debian)
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   
   # For macOS
   brew update && brew install azure-cli
   
   # Verify installation
   az --version
   ```

3. ✅ **GitHub Account** (for automated deployments)

4. ✅ **Local Project Setup**
   - PostgreSQL with your data
   - Both client and server running locally

---

## 🎯 Option 1: Automated Deployment (Recommended)

### Step 1: Run the Deployment Script

```bash
cd /home/hinatanguyen/Laptop-Selling-Website
./azure-deploy.sh
```

The script will:
- ✨ Create all Azure resources
- 🗄️ Migrate your database to Azure PostgreSQL
- ⚙️ Configure environment variables
- 🔐 Generate secure JWT secrets
- 💾 Save credentials to `azure-credentials.txt`

### Step 2: Deploy Backend Code

#### Option A: GitHub Actions (Recommended)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Azure deployment"
   git push origin main
   ```

2. Link GitHub to Azure:
   ```bash
   az webapp deployment source config \
     --resource-group laptop-store-rg \
     --name laptop-store-api \
     --repo-url https://github.com/YOUR_USERNAME/Laptop-Selling-Website \
     --branch main \
     --manual-integration
   ```

#### Option B: ZIP Deploy (Quick & Simple)
```bash
cd server
zip -r ../server.zip . -x "node_modules/*" -x "*.log"
cd ..

az webapp deployment source config-zip \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --src server.zip
```

### Step 3: Deploy Frontend

1. Update the frontend environment:
   ```bash
   # Edit client/.env.production with your actual API URL
   nano client/.env.production
   ```

2. Create Azure Static Web App:
   ```bash
   az extension add --name staticwebapp
   
   az staticwebapp create \
     --name laptop-store-web \
     --resource-group laptop-store-rg \
     --source https://github.com/YOUR_USERNAME/Laptop-Selling-Website \
     --location eastasia \
     --branch main \
     --app-location "/client" \
     --output-location "dist" \
     --login-with-github
   ```

3. This will create a GitHub Actions workflow automatically

### Step 4: Test Your Deployment

```bash
# Test backend
curl https://laptop-store-api.azurewebsites.net/api/products

# Visit frontend
# Open: https://laptop-store-web.azurestaticapps.net
```

---

## 🛠️ Option 2: Manual Step-by-Step Deployment

If you prefer manual control, follow [AZURE-DEPLOYMENT.md](./AZURE-DEPLOYMENT.md) for detailed instructions.

---

## 📊 Monitor Your Deployment

### View Logs
```bash
# Backend logs
az webapp log tail \
  --resource-group laptop-store-rg \
  --name laptop-store-api

# Download logs
az webapp log download \
  --resource-group laptop-store-rg \
  --name laptop-store-api
```

### Check Application Status
```bash
# Backend status
az webapp show \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --query state

# Frontend status
az staticwebapp show \
  --name laptop-store-web \
  --resource-group laptop-store-rg
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Database Connection Failed
**Solution**: Check firewall rules
```bash
# Add your current IP
MY_IP=$(curl -s https://api.ipify.org)
az postgres flexible-server firewall-rule create \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --rule-name AllowMyIP \
  --start-ip-address $MY_IP \
  --end-ip-address $MY_IP
```

### Issue 2: Backend Not Starting
**Solution**: Check logs and restart
```bash
az webapp log tail -g laptop-store-rg -n laptop-store-api
az webapp restart -g laptop-store-rg -n laptop-store-api
```

### Issue 3: CORS Errors
**Solution**: Add frontend URL to CORS
```bash
az webapp cors add \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --allowed-origins "https://laptop-store-web.azurestaticapps.net"
```

### Issue 4: Environment Variables Not Set
**Solution**: Update app settings
```bash
az webapp config appsettings set \
  --resource-group laptop-store-rg \
  --name laptop-store-api \
  --settings KEY=VALUE
```

---

## 💰 Cost Estimation

With Azure for Students:

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| App Service | F1 Free | $0 |
| Static Web Apps | Free | $0 |
| PostgreSQL | B1ms Burstable | ~$12-15 |
| Blob Storage | Pay-as-you-go | ~$0.50-2 |
| **Total** | | **~$12-17/month** |

💡 **Tip**: You have $100 credit, which covers ~6 months of hosting!

---

## 🎨 Optional: Custom Domain Setup

### For Frontend (Static Web App)
```bash
az staticwebapp hostname set \
  --name laptop-store-web \
  --resource-group laptop-store-rg \
  --hostname www.yourdomain.com
```

### For Backend (App Service)
```bash
az webapp config hostname add \
  --resource-group laptop-store-rg \
  --webapp-name laptop-store-api \
  --hostname api.yourdomain.com
```

---

## 📈 Scale Your Application

### Scale Up (More Power)
```bash
# Upgrade App Service plan
az appservice plan update \
  --name laptop-store-plan \
  --resource-group laptop-store-rg \
  --sku B1

# Upgrade Database
az postgres flexible-server update \
  --resource-group laptop-store-rg \
  --name laptop-store-db \
  --sku-name Standard_B2s
```

### Scale Out (More Instances)
```bash
# Add more app instances
az appservice plan update \
  --name laptop-store-plan \
  --resource-group laptop-store-rg \
  --number-of-workers 2
```

---

## 🔐 Security Best Practices

1. **Change Default Credentials**
   - Update JWT_SECRET in production
   - Use strong database passwords

2. **Enable HTTPS Only**
   ```bash
   az webapp update \
     --resource-group laptop-store-rg \
     --name laptop-store-api \
     --https-only true
   ```

3. **Set Up Key Vault** (Optional but Recommended)
   ```bash
   az keyvault create \
     --name laptop-store-vault \
     --resource-group laptop-store-rg \
     --location eastasia
   ```

4. **Enable Application Insights**
   ```bash
   az monitor app-insights component create \
     --app laptop-store-insights \
     --location eastasia \
     --resource-group laptop-store-rg
   ```

---

## 🧹 Clean Up Resources

If you need to delete everything:

```bash
# Delete the entire resource group
az group delete --name laptop-store-rg --yes --no-wait

# This will delete:
# - App Service
# - Database
# - Static Web App
# - All associated resources
```

---

## 📚 Additional Resources

- [Azure for Students Portal](https://portal.azure.com/#blade/Microsoft_Azure_Education/EducationMenuBlade/overview)
- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/)

---

## 🆘 Need Help?

1. **Check the logs**: `az webapp log tail -g laptop-store-rg -n laptop-store-api`
2. **Read detailed guide**: [AZURE-DEPLOYMENT.md](./AZURE-DEPLOYMENT.md)
3. **Azure Support**: Available with your student subscription

---

## ✅ Deployment Checklist

- [ ] Azure CLI installed and logged in
- [ ] Run `./azure-deploy.sh` script
- [ ] Database migrated successfully
- [ ] Backend code deployed
- [ ] Frontend deployed to Static Web Apps
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Test all features working
- [ ] Monitor logs for errors
- [ ] Set up alerts and monitoring

---

**🎉 Congratulations!** Your Laptop Selling Website is now live on Azure!

Share your site with customers: `https://laptop-store-web.azurestaticapps.net`
