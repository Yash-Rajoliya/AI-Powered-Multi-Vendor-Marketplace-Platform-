#!/bin/bash
set -eo pipefail

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Stop existing containers safely
echo "🛑 Stopping old containers..."
docker-compose down --remove-orphans

# Build and start services
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Safely cleanup dangling images only
echo "🧹 Cleaning up unused build images..."
docker image prune -f

echo "✅ Deployment completed successfully!"