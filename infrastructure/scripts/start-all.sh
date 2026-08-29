#!/bin/bash
set -eo pipefail

echo "🚀 Starting all services..."

# Step 1: Start core infrastructure first
echo "📦 Starting databases and monitoring infrastructure..."
docker-compose up -d mongodb redis prometheus grafana

# Step 2: Allow infrastructure services a moment to initialize
echo "⏳ Waiting for infrastructure to initialize..."
sleep 5

# Step 3: Start dependent application services and gateway
echo "⚡ Starting application services..."
docker-compose up -d

echo "📊 Services running:"
docker ps

echo "🌐 API Gateway: http://localhost:4000"
echo "📈 Grafana: http://localhost:3000"
echo "📡 Prometheus: http://localhost:9090"