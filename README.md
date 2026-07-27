# GlowEssence 🌿

A full-stack MERN e-commerce platform for a clean-beauty cosmetics brand —
skincare, makeup, hair care, and fragrance — with separate experiences for
**shoppers**, **sellers**, and **admins**.

Built by **Kashish**, **Bhumi**, **Ziya**, and **Maitri**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Redux Toolkit |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt |
| Payments | Razorpay |
| Email | Nodemailer (Gmail SMTP) |
| Icons | Bootstrap Icons |

---

## Project Structure

```
GlowEssence/
├── Backend/            Express API server
│   ├── models/          Mongoose schemas
│   ├── controllers/     Route logic
│   ├── routes/          API endpoints
│   ├── middlewares/      Auth & validation
│   └── configs/         DB, email, Razorpay setup
│
└── Frontend/            React app
    ├── src/pages/        One folder per page
    ├── src/components/   Shared/reusable UI (navbar, footer, product cards)
    ├── src/features/     Redux slices (one per domain: cart, orders, admin...)
    ├── src/routes/       App routing + role-based route guards
    └── src/store/        Redux store setup
```

---

## Getting Started

### 1. Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

Backend runs at `http://localhost:3000`.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. It's already configured (see
`vite.config.js`) to proxy `/api` requests to the backend, so no CORS setup
is needed.

---

## Who Can Do What

| Role | Can... |
|---|---|
| **Shopper** | Browse, search & filter products, add to cart/wishlist, checkout & pay, leave reviews, manage their own profile |
| **Seller** | Register a business account, add/edit/delete their own products, manage their own product categories & brands, view their own sales/revenue dashboard |
| **Admin** | View store-wide analytics (revenue, top products, recent orders), manage all registered users |

---

## Key Features

- 🔐 Separate auth flows for shoppers and sellers, with email verification and forgot/reset password
- 🛒 Cart & Wishlist, backed by the real database
- 💳 Real Razorpay checkout for multi-item orders
- ⭐ Product reviews with pagination
- 🔍 Shop page with live category/price filters, sorting, and pagination
- 📊 Role-based dashboards (Admin overview + charts, Seller product & revenue management)
- 📱 Fully responsive, custom-designed UI (no UI framework — hand-built with plain CSS)

---

## Team

| Name | 
|---|
| Kashish |
| Bhumi |
| Ziya |
| Maitri |

---

For a deeper breakdown of the architecture, data flow, and every feature
built, see [PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md).
