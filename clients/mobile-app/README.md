# 🚀 AI-Powered Multi-Vendor Marketplace (Flutter App)

A production-grade **mobile marketplace application** built using Flutter, integrated with a **microservices backend via API Gateway**, supporting AI-driven recommendations, real-time notifications, and advanced mobile-first features.

---

## 🧠 Tech Stack

### 📱 Mobile

* Flutter (Modular Architecture)
* Riverpod (State Management)
* Dio (Networking Layer)
* GoRouter (Navigation)

### 🧩 Backend (Integrated)

* Node.js (Microservices)
* API Gateway (Single Entry Point)
* MongoDB (Database)
* Redis (Caching Layer)
* RabbitMQ (Async Processing)
* AWS S3 (Media Storage)

---

## 🏗️ Architecture Overview

### 📌 High-Level System Flow

```
Flutter App
   ↓
API Gateway
   ↓
Microservices (Auth, Product, Order, Recommendation)
   ↓
Async Queue (RabbitMQ)
   ↓
Notification / Recommendation Engines
```

---

### 📌 Mobile Architecture (Clean + Feature-First)

```
Presentation Layer (UI + Riverpod Controllers)
   ↓
Domain Layer (Entities)
   ↓
Repository Layer (Business Logic + safeApiCall)
   ↓
Data Source Layer (Remote API Calls)
   ↓
Core Network Layer (Dio + Interceptors)
```

---

### 📌 Networking Flow

```
User Action
   ↓
Controller (Riverpod)
   ↓
Repository (safeApiCall)
   ↓
Remote DataSource
   ↓
ApiClient (Dio)
   ↓
Interceptors (Auth + Logging + Retry)
   ↓
API Gateway
```

---

## 🔥 Key Features

### 🛒 Marketplace Core

* Multi-vendor product catalog
* Product search & filtering
* Cart & checkout flow
* Order management

### 🤖 AI Features

* Personalized product recommendations
* Behavior-based ranking system

### 📱 Mobile-First Enhancements

* Voice search
* Camera-based product search
* Barcode scanning

### 🔐 Security

* JWT-based authentication
* Secure token storage
* Biometric authentication

### ⚡ Performance

* Redis-backed caching (backend)
* Pagination & lazy loading
* Debounced search

### 🔔 Real-Time Capabilities

* Push notifications (FCM)
* Event-driven async updates

---

## 🧩 Advanced Engineering Practices

* Feature-first modular architecture
* Clean architecture (Separation of Concerns)
* Repository pattern with safe API wrapper
* Centralized error handling (ErrorMapper)
* Request tracing (X-Request-ID)
* Retry & timeout strategies
* Scalable dependency injection (Riverpod)

---

## 📂 Folder Structure

```
lib/
 ├── core/            # Global infrastructure (network, config, services)
 ├── shared/          # Reusable UI components & utilities
 ├── features/        # Feature modules (auth, product, cart, etc.)
 ├── app.dart         # App-level configuration
 └── main.dart        # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

* Flutter SDK (>=3.0.0)
* Dart SDK
* Android Studio / VS Code

---

### Installation

```
git clone <your-repo-url>
cd mobile-app
flutter pub get
```

---

### Run the App

```
flutter run
```

---

## 🔧 Environment Configuration

Create `.env` file:

```
BASE_URL=http://10.0.2.2:8080/api
```

---

## 📡 API Integration

The app communicates via an **API Gateway**, ensuring:

* Centralized authentication
* Request routing to microservices
* Logging & observability
* Scalability & maintainability

---

## 🧪 Future Enhancements

* Offline-first support (Hive caching)
* Unit & integration testing
* CI/CD pipeline
* Advanced analytics integration
* Real-time chat between users & vendors

---

## 👨‍💻 Author

Yash Rajoliya

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to fork!
