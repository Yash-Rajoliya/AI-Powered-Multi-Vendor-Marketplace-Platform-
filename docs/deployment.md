# 🚀 Deployment Guide

This guide explains how to deploy the AI-powered multi-vendor marketplace platform using Docker and CI/CD.

---

## 📦 Prerequisites

Ensure the following are installed:

- Docker
- Docker Compose
- Git

---

## 📁 Project Setup

Clone the repository:

```bash
git clone https://github.com/your-username/marketplace-platform.git
cd marketplace-platform
🔐 Environment Configuration

Each microservice requires a .env file.

Example .env
PORT=4001

MONGO_URI=mongodb://mongodb:27017/marketplace
REDIS_URL=redis://redis:6379
RABBITMQ_URL=amqp://rabbitmq

JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key

⚠️ Important:
Use service names (mongodb, redis, rabbitmq) instead of localhost inside Docker.

🐳 Running with Docker

Start all services:

docker-compose up --build

Run in detached mode:

docker-compose up -d
🔗 Service Endpoints
Service	URL
API Gateway	http://localhost:4000

Auth Service	http://localhost:4001

Product Service	http://localhost:4002

Vendor Service	http://localhost:4003

Inventory Service	http://localhost:4004

Order Service	http://localhost:4005

Recommendation Service	http://localhost:4006

Notification Service	http://localhost:4010
🧪 Health Check
GET http://localhost:4000/health

Expected response:

{
  "status": "API Gateway running"
}
📊 Infrastructure Services
Service	URL
MongoDB	mongodb://localhost:27017
Redis	localhost:6379
RabbitMQ	http://localhost:15672

RabbitMQ credentials:

username: guest
password: guest
⚡ Scaling Services

Scale any microservice:

docker-compose up --scale product-service=3
🔄 CI/CD Deployment (GitHub Actions)

On every push to main:

Build pipelines run

Docker images are created

Images are pushed to DockerHub

Auto-deployment to server via SSH

🌐 Production Deployment (Server)
Step 1: Setup Server
sudo apt update
sudo apt install docker docker-compose -y
Step 2: Clone Repo
git clone https://github.com/your-username/marketplace-platform.git
cd marketplace-platform
Step 3: Run Services
docker-compose up -d --build
🔐 GitHub Secrets Required
DOCKER_USERNAME
DOCKER_PASSWORD
SERVER_HOST
SERVER_SSH_KEY
🛑 Stop Services
docker-compose down
🧠 Deployment Flow
Code Push → GitHub Actions → Build → Docker Push → Server Deploy
📌 Notes

Ensure ports are not occupied

Use .env for secrets (never commit secrets)

For production, use HTTPS and domain setup

🚀 Future Improvements

Kubernetes (EKS/GKE)

Load balancing

Blue-green deployment

Monitoring (Prometheus + Grafana)