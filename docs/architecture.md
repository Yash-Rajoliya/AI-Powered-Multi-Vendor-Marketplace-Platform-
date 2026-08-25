# Architecture Overview

## Microservices Breakdown

### 1. Auth Service
Handles authentication and authorization.
- JWT-based authentication
- Role-based access (user/vendor)

### 2. Product Service
Manages product catalog.
- CRUD operations
- Redis caching for listings

### 3. Vendor Service
Manages vendor onboarding and store profiles.

### 4. Inventory Service
Tracks stock and reservations.
- Real-time stock updates
- Event-driven stock deduction

### 5. Order Service
Handles order lifecycle.
- Order creation
- Payment integration
- Event publishing

### 6. Recommendation Service
AI-powered product recommendations.
- Collaborative filtering
- Similarity engine
- Ranking system

### 7. Notification Service
Handles:
- Email notifications
- SMS alerts
- Order confirmations

### 8. API Gateway
- Central entry point
- Request routing
- Authentication middleware
- Rate limiting

---

## Event-Driven Flow
Order Created → RabbitMQ → Inventory Service → Stock Update
↓
Notification Service


---

## Data Storage

- MongoDB: Primary database
- Redis: Caching layer

---

## Security

- JWT authentication
- API Gateway validation
- Environment-based secrets