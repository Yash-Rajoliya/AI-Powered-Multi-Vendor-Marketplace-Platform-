---

# 📄 `docs/api-spec.md`

```md
# 📡 API Specification

All APIs are accessed via API Gateway.

---

## 🌐 Base URL


http://localhost:4000/api


---

## 🔐 Authentication

Protected routes require JWT:


Authorization: Bearer <token>


---

# 🧑 Auth Service

### Register User


POST /auth/register


Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
Login
POST /auth/login

Response:

{
  "token": "jwt_token"
}
🛍️ Product Service
Get All Products
GET /products
Get Product by ID
GET /products/:id
Create Product
POST /products
Update Product
PUT /products/:id
Delete Product
DELETE /products/:id
🏪 Vendor Service
Create Vendor
POST /vendors
Get Vendor
GET /vendors/:id
📦 Inventory Service
Get Stock
GET /inventory/:productId
Update Stock
PUT /inventory/:productId/stock
🧾 Order Service
Create Order
POST /orders
Get Orders
GET /orders
🤖 Recommendation Service
Get User Recommendations
GET /recommendations/user/:userId
Get Similar Products
GET /recommendations/similar/:productId
📩 Notification Service

Internal event-driven service (not exposed publicly)

📊 Standard Response Format
Success
{
  "success": true,
  "data": {}
}
Error
{
  "success": false,
  "message": "Error message"
}
⚠️ Error Codes
Code	Meaning
400	Bad Request
401	Unauthorized
404	Not Found
500	Internal Server Error
🔄 API Flow Example
User → API Gateway → Order Service
                    ↓
               RabbitMQ Event
                    ↓
         Inventory Service → Notification Service
🚀 Notes

All APIs are RESTful

Use JSON for request/response

Follow proper authentication for protected routes

API Gateway handles routing and security