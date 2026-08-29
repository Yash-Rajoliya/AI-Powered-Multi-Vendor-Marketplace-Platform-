#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Stop existing containers
echo "🛑 Stopping old containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Cleanup unused images
echo "🧹 Cleaning up..."
docker system prune -f

echo "✅ Deployment completed successfully!"