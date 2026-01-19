#!/bin/bash

# Azure App Service deployment script for Node.js

# Ensure we're in the correct directory
cd "$DEPLOYMENT_SOURCE/server" || exit

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Run any migrations if needed
if [ -f "src/scripts/migrate-indexes.js" ]; then
  echo "Running migrations..."
  npm run migrate:indexes || echo "Migrations failed or not needed"
fi

echo "Deployment complete!"
