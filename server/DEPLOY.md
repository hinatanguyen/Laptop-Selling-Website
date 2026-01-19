# Free Demo Deployment (Vercel + Render + Neon)

This guide sets up a free demo stack you can upgrade later.

## Architecture
- Frontend: Vercel (deploy `client`)
- API (Node/Express + Socket.io): Render (free Web Service)
- Database: Neon (free Postgres, serverless, TLS)
- Optional: Cloudinary (free) for image uploads instead of local disk

## 1) Create Neon Postgres
1. Sign up at https://neon.tech and create a project
2. Note the connection string (DATABASE_URL)
3. Ensure SSL is enabled (default for Neon)

### Import local data
Export local DB:
```bash
pg_dump -h localhost -U <local_user> -d <local_db> --no-owner --no-acl > backup.sql
```
Restore to Neon:
```bash
psql "<DATABASE_URL>?sslmode=require" -f backup.sql
```
Verify:
```bash
psql "<DATABASE_URL>?sslmode=require" -c "SELECT COUNT(*) FROM products;"
psql "<DATABASE_URL>?sslmode=require" -c "SELECT COUNT(*) FROM orders;"
```

## 2) Deploy API on Render
1. Create a new Web Service from your GitHub repo
2. Build command: `npm install && npm run build` (if you have one) or `npm install`
3. Start command: `node src/server.js` (in `/server` directory)
4. Set Environment Variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<Neon DATABASE_URL>`
   - (Alternatively) `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Any other secrets used by your server

> The app now supports `DATABASE_URL` directly (see `src/config/database.js`).

5. Networking
   - Enable WebSockets (Render supports them by default)

6. Optional: Image uploads
   - Use Cloudinary: add `CLOUDINARY_URL` and upload to Cloudinary in your upload route
   - Avoid writing to local `/public/uploads` in production; disks are ephemeral on free tiers

## 3) Deploy Frontend on Vercel
1. Import the `client` folder as a Vercel project (Vite React app)
2. Set Environment Variables:
   - `VITE_API_URL=https://<render-service>.onrender.com/api`
   - `VITE_USD_TO_VND_RATE=24000` (if you want a custom rate)
3. Build outputs automatically; preview the app

## 4) Smoke Tests
- API health: `GET https://<render>/api/health` (add route if needed)
- Admin dashboard loads stats from Neon
- Create an order; confirm it appears under admin orders
- Notifications: verify socket toasts if enabled

## Data Seeding & Cleanup
- Seed base schema and default users: `npm run seed`
- Seed dummy products only: `npm run seed:products`
- Seed dummy orders (requires products): `npm run seed:orders` or `npm run seed:orders:count`
- Cleanup non-product data (orders, contact messages): `npm run cleanup:nonproduct`

## 5) Upgrade Path
- Neon: add compute/storage tiers
- Render: upgrade Web Service plan
- Vercel: upgrade project plan
- Storage: move to Cloudinary (free → paid) or S3-compatible bucket

## Troubleshooting
- SSL errors: ensure `?sslmode=require` is appended to your `DATABASE_URL` if provider needs it
- Long cold starts (free tiers): first request may be slow; warm service or upgrade
- File uploads missing: use external storage; free tier disks are not persistent

