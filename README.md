# 🚀 AI-Powered Multi-Vendor Marketplace Platform

A **production-grade microservices-based e-commerce platform** with AI-powered recommendations, real-time inventory management, and full-stack integration (Web + Mobile).

---

## 🧠 Architecture Overview

![Architecture](./screenshots/architecture.png)

---

## 🧱 System Architecture

```
                         ┌──────────────────────────────┐
                         │   React Web Client (SPA)     │
                         │   Flutter Mobile App         │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                         ┌──────────────────────────────┐
                         │         API Gateway          │
                         │  (Routing, Auth, Rate Limit) │
                         └──────────────┬───────────────┘
                                        │
     ┌──────────────────────────────────┼──────────────────────────────────┐
     ▼                                  ▼                                  ▼
┌──────────────┐                 ┌──────────────┐                 ┌──────────────┐
│ Auth Service │                 │ Product Svc  │                 │ Order Service│
│ (JWT/Auth)   │                 │ (Catalog)    │                 │ (Payments)   │
└──────┬───────┘                 └──────┬───────┘                 └──────┬───────┘
       │                                │                                │
       ▼                                ▼                                ▼
┌──────────────┐                 ┌──────────────┐                 ┌──────────────┐
│ Vendor Svc   │                 │ InventorySvc │                 │ Recommendation│
│ (Stores)     │                 │ (Stock Mgmt) │                 │ (AI Engine)  │
└──────┬───────┘                 └──────┬───────┘                 └──────┬───────┘
                                       │                                │
                                       ▼                                ▼
                                ┌────────────────────┐         ┌────────────────────┐
                                │    RabbitMQ        │────────▶│ Notification Svc   │
                                │ (Event Bus)        │         │ (Email/SMS)        │
                                └────────────────────┘         └────────────────────┘

────────────────────────────────────────────────────────────────────────────────────

          ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
          │   MongoDB    │     │    Redis     │     │   Stripe     │
          │ (Database)   │     │  (Caching)   │     │ (Payments)   │
          └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
                 │                    │                    │
                 └────────────┬───────┴────────────┬───────┘
                              ▼                    ▼
                        All Microservices Access Shared Infrastructure

────────────────────────────────────────────────────────────────────────────────────

        ┌──────────────────────┐      ┌──────────────────────┐
        │    Prometheus        │      │       Grafana        │
        │ (Metrics Collection) │────▶ │ (Visualization)      │
        └──────────────────────┘      └──────────────────────┘

────────────────────────────────────────────────────────────────────────────────────

        ┌──────────────────────────────────────────────────────────┐
        │              CI/CD Pipeline (GitHub Actions)             │
        │  Code Push → Build → Test → Docker Build → Deploy        │
        └──────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────

        ┌──────────────────────────────────────────────────────────┐
        │              Deployment (Docker / Compose)               │
        │   Containerized Microservices with Network Isolation     │
        └──────────────────────────────────────────────────────────┘
---

## ⚙️ Tech Stack

### Backend

* Node.js + Express.js
* MongoDB (Mongoose)
* Redis (Caching)
* RabbitMQ (Event-driven messaging)
* Stripe (Payments)

### Frontend

* React
* Redux Toolkit
* Axios
* Tailwind CSS

### Mobile

* Flutter

### DevOps & Infra

* Docker & Docker Compose
* GitHub Actions (CI/CD)
* Prometheus (Monitoring)
* Grafana (Visualization)

---

## 🌐 Web Client

* Responsive UI
* Product listing & details
* Cart & checkout
* Vendor dashboard

---

## 📱 Mobile App

* Cross-platform (Android + iOS)
* API-driven architecture
* Optimized performance

---

## ✨ Features

* Multi-vendor marketplace
* JWT authentication
* API Gateway routing
* AI recommendation engine
* Event-driven architecture
* Redis caching (low latency)
* Stripe payment integration
* Dockerized deployment
* CI/CD pipeline
* Monitoring & observability

---

## 🔗 End-to-End Flow

```
React / Flutter
      ↓
API Gateway
      ↓
Microservices
      ↓
MongoDB / Redis / RabbitMQ
```

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/marketplace-platform.git
cd marketplace-platform
```

---

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

---

## 📊 Monitoring

| Tool       | URL                   |
| ---------- | --------------------- |
| Prometheus | http://localhost:9090 |
| Grafana    | http://localhost:3000 |

---

## 📡 Infrastructure

| Service            | URL                       |
| ------------------ | ------------------------- |
| API Gateway        | http://localhost:4000     |
| RabbitMQ Dashboard | http://localhost:15672    |
| MongoDB            | mongodb://localhost:27017 |
| Redis              | localhost:6379            |

---

## 🔐 Default Credentials

**RabbitMQ**

* Username: admin
* Password: admin123

---

## 📸 Screenshots

```
/screenshots
home.png
product.png
cart.png
vendor-dashboard.png
architecture.png
```

---

## 📚 Documentation

* [System Design](docs/system-design.md)
* [Architecture](docs/architecture.md)
* [Deployment](docs/deployment.md)
* [API Spec](docs/api-spec.md)

---

## 🚀 CI/CD Pipeline

* Automated builds using GitHub Actions
* Docker image build & push
* Auto-deployment via SSH

---

## 🔮 Future Enhancements

* Kubernetes deployment
* Service mesh (Istio)
* Advanced AI models
* Real-time analytics dashboard

---

## 👨‍💻 Author

Your Name

---

## ⭐ Support

If you found this useful:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

## 🧠 Key Highlights

* Microservices architecture
* API Gateway pattern
* Event-driven system
* Full-stack integration
* Production-ready DevOps

---

> Built to demonstrate real-world scalable system design and engineering practices.
