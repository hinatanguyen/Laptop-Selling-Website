#!/bin/bash

# Azure deployment script

# Exit on any error
set -e

echo "Starting Azure deployment..."

# Navigate to server directory
cd server

# Install dependencies
echo "Installing dependencies..."
npm install --production

# No build step needed for this project

echo "Deployment complete!"
