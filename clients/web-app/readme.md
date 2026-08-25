# 🚀 SmartCart — AI-Powered Multi-Vendor Marketplace (Frontend)

SmartCart is a production-grade, AI-powered multi-vendor marketplace frontend built using modern web technologies. It delivers a premium, high-performance user experience inspired by Stripe, Shopify, and Apple.

---

## 🌟 Features

### 🛍️ Marketplace
- AI-powered product recommendations
- Smart search with personalized suggestions
- Advanced filtering & sorting
- Product detail pages with variants & reviews

### 🛒 Shopping Experience
- Dynamic cart with real-time updates
- Stripe-style checkout flow
- Optimistic UI interactions
- Responsive and mobile-first design

### 🧑‍💼 Vendor Dashboard
- Revenue analytics & charts
- Product & inventory management
- Order tracking system
- AI-driven insights

### 🤖 AI Enhancements
- Personalized recommendations
- Smart filter suggestions
- "Inspired by your browsing" UX

---

## 🏗️ Tech Stack

- Frontend: React (Vite)
- Styling: TailwindCSS + Glassmorphism UI
- Animations: Framer Motion
- State Management: Zustand
- Charts: Recharts
- API Layer: Axios
- Routing: React Router
- Deployment: Docker + Nginx

---

## 📂 Project Structure

src/
├── app/              # App config, routing, state
├── components/       # UI & reusable components
├── features/         # Domain-based modules
├── pages/            # Screens (Home, Product, Cart, etc.)
├── services/         # API layer
├── shared/           # Hooks, utils, constants
├── styles/           # Theme & global styles

---

## ⚙️ Setup & Installation

### 1. Clone Repository
git clone https://github.com/your-username/smartcart-frontend.git  
cd smartcart-frontend  

### 2. Install Dependencies
npm install  

### 3. Run Development Server
npm run dev  

---

## 🐳 Docker Setup

### Build Image
docker build -t smartcart-frontend .  

### Run Container
docker run -p 3000:80 smartcart-frontend  

Open: http://localhost:3000  

---

## 🔐 Authentication & Roles

- JWT-based authentication
- Role-based access control:
  - User
  - Vendor
  - Admin

---

## 🎨 Design Philosophy

- Clean, premium UI (Stripe + Apple inspired)
- Glassmorphism with soft shadows
- Smooth micro-interactions
- Mobile-first UX

---

## ⚡ Performance Optimizations

- Lazy loading images
- Skeleton loaders
- Optimized bundle using Vite
- API caching ready (Redis integration support)

---

## 🧠 Frontend Architecture

### High-Level Structure

React UI (Vite)
│
├── App Layer
│   ├── Router (React Router)
│   ├── Global State (Zustand)
│   └── Providers
│
├── Presentation Layer
│   ├── Pages
│   ├── Components
│
├── Domain Layer (Features)
│   ├── Auth
│   ├── Product
│   ├── Cart
│   ├── Vendor
│
├── Service Layer
│   ├── API Calls (Axios)
│   ├── Business Logic
│
├── Shared Layer
│   ├── Hooks
│   ├── Utils
│   ├── Constants
│
└── Styling Layer
    ├── TailwindCSS
    ├── Theme System

---

## 🔄 Data Flow

User Action  
→ Component  
→ Hook (optional)  
→ Service (API call)  
→ Backend  
→ Response  
→ Zustand Store  
→ UI Update  

---

## 🔐 Authentication Flow

Login → API → JWT Token  
→ Stored in localStorage  
→ Axios interceptor attaches token  
→ ProtectedRoute validates role  
→ Access granted / redirect  

---

## 🧩 Component Architecture

UI Components (Button, Input)  
→ Reusable Components (ProductCard)  
→ Feature Components (CartItem)  
→ Page Composition (CartPage)  

---

## 🤖 AI Integration (Frontend)

User Behavior  
→ API Request  
→ Recommendation Service  
→ Personalized Data  
→ Rendered in UI  

---

## 🔮 Future Enhancements

- Real-time updates using WebSockets
- AI search with vector database
- Voice-based product search
- Progressive Web App (PWA)

---

## 📸 Screenshots

(Add screenshots here)

- Homepage
- Product Listing
- Product Detail
- Cart & Checkout
- Vendor Dashboard

---

## 👨‍💻 Author

Built by [Your Name]

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!