#!/bin/bash

echo "🚀 Starting all services..."

docker-compose up -d

echo "📊 Services running:"
docker ps

echo "🌐 API Gateway: http://localhost:4000"
echo "📈 Grafana: http://localhost:3000"
echo "📡 Prometheus: http://localhost:9090"