# Azure Deployment Progress Checklist

## Pre-Deployment Preparation
- [ ] Azure CLI installed (`az --version`)
- [ ] Logged into Azure (`az login`)
- [ ] Azure for Students subscription verified
- [ ] Local database has all required data
- [ ] GitHub repository created (optional but recommended)
- [ ] Project builds successfully locally
  - [ ] `cd server && npm install && npm start`
  - [ ] `cd client && npm install && npm run dev`

## Phase 1: Azure Infrastructure Setup (30-40 minutes)

### Database Setup
- [ ] Resource group created (`laptop-store-rg`)
- [ ] PostgreSQL server created (`laptop-store-db`)
- [ ] Database created (`laptop_store`)
- [ ] Firewall rules configured
  - [ ] Azure services allowed (0.0.0.0)
  - [ ] Your local IP added
- [ ] Local database exported to `backup.sql`
- [ ] Database imported to Azure PostgreSQL
- [ ] Verified data import (product count, order count)
- [ ] Connection string saved securely

**Connection String:**
```
postgresql://adminuser:PASSWORD@laptop-store-db.postgres.database.azure.com/laptop_store?sslmode=require
```

### Backend Setup
- [ ] App Service Plan created (`laptop-store-plan`)
- [ ] Web App created (`laptop-store-api`)
- [ ] Runtime set to Node.js 18 LTS
- [ ] WebSockets enabled (for Socket.io)
- [ ] Environment variables configured:
  - [ ] NODE_ENV=production
  - [ ] PORT=8080
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET (generated)
  - [ ] JWT_EXPIRES_IN=7d
  - [ ] FRONTEND_URL
  - [ ] AZURE_STORAGE_* (if using blob storage)
- [ ] CORS configured with frontend URL
- [ ] Startup command set

**Backend URL:** `https://laptop-store-api.azurewebsites.net`

### Frontend Setup
- [ ] Static Web App created (`laptop-store-web`)
- [ ] GitHub integration configured
- [ ] Build settings configured:
  - [ ] App location: `/client`
  - [ ] Output location: `dist`
- [ ] Environment variables set in Static Web App
  - [ ] VITE_API_URL
  - [ ] VITE_USD_TO_VND_RATE
- [ ] `staticwebapp.config.json` created
- [ ] `.env.production` updated with correct API URL

**Frontend URL:** `https://laptop-store-web.azurestaticapps.net`

## Phase 2: Code Deployment (15-20 minutes)

### Backend Deployment
Choose one method:
- [ ] **Method A:** GitHub Actions
  - [ ] Repository linked to App Service
  - [ ] Automatic deployment configured
  - [ ] Push code to GitHub
  - [ ] Verify deployment in Azure Portal
  
- [ ] **Method B:** ZIP Deploy
  - [ ] Server code zipped (excluding node_modules)
  - [ ] Deployed via `az webapp deployment source config-zip`
  - [ ] Deployment confirmed

### Frontend Deployment
- [ ] GitHub Actions workflow created automatically
- [ ] Code pushed to GitHub
- [ ] Workflow triggered and completed
- [ ] Build succeeded
- [ ] Static files deployed

## Phase 3: Testing & Verification (15-20 minutes)

### Backend API Testing
- [ ] API is accessible: `curl https://laptop-store-api.azurewebsites.net/api/products`
- [ ] Health check passes (if implemented)
- [ ] Products endpoint returns data
- [ ] Authentication works (login/register)
- [ ] Admin endpoints accessible
- [ ] File upload works (if applicable)
- [ ] WebSocket connection established
- [ ] No errors in logs

**Check logs:**
```bash
az webapp log tail -g laptop-store-rg -n laptop-store-api
```

### Frontend Testing
- [ ] Website loads: `https://laptop-store-web.azurestaticapps.net`
- [ ] Home page displays correctly
- [ ] Products page shows all items
- [ ] Product details page works
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] User registration
- [ ] User login
- [ ] Admin login
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] All images load correctly
- [ ] Mobile responsive
- [ ] No console errors

### Integration Testing
- [ ] Frontend connects to backend API
- [ ] CORS works correctly
- [ ] Database queries execute successfully
- [ ] File uploads work (if applicable)
- [ ] Email notifications (if configured)
- [ ] Socket.io real-time updates
- [ ] Payment processing (if Stripe configured)

## Phase 4: Security & Optimization (10-15 minutes)

### Security
- [ ] HTTPS only enabled
- [ ] Strong passwords used everywhere
- [ ] JWT secret is secure (not default)
- [ ] Database firewall properly configured
- [ ] No sensitive data in logs
- [ ] Environment variables not in source code
- [ ] `.env` files in `.gitignore`
- [ ] CORS limited to specific origins
- [ ] Rate limiting configured

### Performance
- [ ] Compression enabled on backend
- [ ] Static assets cached
- [ ] Database indexes in place
- [ ] Connection pooling configured
- [ ] Images optimized
- [ ] CDN configured (optional)

## Phase 5: Monitoring & Maintenance

### Monitoring Setup
- [ ] Application Insights enabled (optional)
- [ ] Log streaming working
- [ ] Budget alerts configured
- [ ] Health check endpoint created
- [ ] Monitoring dashboard set up

### Documentation
- [ ] Deployment credentials saved securely (`azure-credentials.txt`)
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Admin account credentials stored safely
- [ ] Backup and recovery plan documented

## Phase 6: Post-Deployment

### Optimization
- [ ] Review initial performance
- [ ] Check database query performance
- [ ] Optimize slow endpoints
- [ ] Set up CDN if needed
- [ ] Configure caching strategies

### Customer Preview
- [ ] Share frontend URL with customers
- [ ] Gather initial feedback
- [ ] Monitor usage patterns
- [ ] Track any errors or issues
- [ ] Make necessary adjustments

### Optional Enhancements
- [ ] Custom domain configured
- [ ] SSL certificate (automatic with custom domain)
- [ ] Email service configured (SendGrid)
- [ ] SMS notifications (Twilio)
- [ ] Analytics (Google Analytics)
- [ ] SEO optimization
- [ ] Sitemap generated
- [ ] robots.txt configured

## Cost Management

### Monthly Budget Tracking
- [ ] Initial costs estimated
- [ ] Budget alerts set at 50%, 75%, 90%
- [ ] Regular cost review scheduled
- [ ] Unnecessary resources identified
- [ ] Scaling plan documented

**Estimated Monthly Cost:**
- App Service (F1): $0
- Static Web Apps: $0
- PostgreSQL (B1ms): ~$12-15
- Storage: ~$0.50-2
- **Total: ~$12-17/month**

**Azure for Students Credit:** $100 (~6 months of hosting)

## Troubleshooting Log

| Issue | Date | Solution | Status |
|-------|------|----------|--------|
| | | | |
| | | | |
| | | | |

## Important URLs

| Service | URL |
|---------|-----|
| Frontend | https://laptop-store-web.azurestaticapps.net |
| Backend API | https://laptop-store-api.azurewebsites.net |
| Database | laptop-store-db.postgres.database.azure.com |
| Azure Portal | https://portal.azure.com |
| GitHub Repo | https://github.com/YOUR_USERNAME/Laptop-Selling-Website |

## Support Contacts

- **Azure Support:** Available through portal
- **Documentation:** See AZURE-DEPLOYMENT.md and QUICKSTART-AZURE.md
- **Issues:** GitHub Issues tab

---

## 🎉 Deployment Complete!

- [ ] All checks passed
- [ ] Customers can access the site
- [ ] Monitoring is active
- [ ] Documentation is complete

**Deployed on:** _______________  
**Deployed by:** _______________  
**Version:** _______________

---

**Notes:**
- Check off items as you complete them
- Add any issues to the Troubleshooting Log
- Keep this checklist updated
- Review weekly for the first month
