# GlowEssence — Project Documentation

**A Full-Stack E-Commerce Platform for Clean Beauty Products**

**Team Members:** Kashish · Bhumi · Ziya · Maitri

---

## 1. Introduction

GlowEssence is a full-stack e-commerce web application built for a clean
beauty and cosmetics brand, covering skincare, makeup, hair care, and
fragrance products. Unlike a typical single-role shopping site, GlowEssence
supports **three distinct types of users** — shoppers, sellers, and
administrators — each with their own dedicated experience.

### 1.1 Objective

To build a production-style, role-based e-commerce platform demonstrating:
- Real user authentication and authorization (shopper, seller, admin)
- A working shopping cart, wishlist, and checkout with real payment integration
- A multi-vendor marketplace model where independent sellers list their own products
- An admin panel for platform-wide oversight
- A fully custom, responsive UI built without a component library

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 + Vite | UI and fast dev tooling |
| Routing | React Router v7 | Client-side navigation, role-based route guards |
| State Management | Redux Toolkit | Global state (auth, cart, wishlist, products, orders...) |
| Backend | Node.js + Express 5 | REST API server |
| Database | MongoDB + Mongoose | Data storage and schema modeling |
| Authentication | JWT + bcrypt | Stateless auth tokens, password hashing |
| Payments | Razorpay | Real checkout/payment processing |
| Email | Nodemailer (Gmail SMTP) | Account verification & password reset emails |
| Styling | Hand-written CSS (no framework) | Fully custom, brand-specific design system |

---

## 3. System Architecture

```
┌─────────────────┐        HTTP/JSON         ┌──────────────────┐
│   React Frontend │ ───────────────────────▶ │  Express Backend │
│   (Vite, :5173)  │ ◀─────────────────────── │     (:3000)      │
└─────────────────┘      REST API calls       └────────┬─────────┘
                                                          │
                                                          ▼
                                                 ┌──────────────────┐
                                                 │     MongoDB      │
                                                 │  (Mongoose ODM)  │
                                                 └──────────────────┘
```

- The frontend never talks to MongoDB directly — every action goes through
  the Express REST API.
- In development, Vite proxies all `/api/*` requests to the backend
  (configured in `vite.config.js`), so there's no CORS setup needed even
  though the backend has none configured.
- Redux Toolkit slices (one per feature — `cart`, `wishlist`, `orders`,
  `admin`, etc.) each own a small piece of global state and talk to their
  matching backend routes via `createAsyncThunk`.

### 3.1 Authentication Model

Three separate identities exist, each with its own login flow and JWT:

| Identity | Model | Login Endpoint | Frontend Session |
|---|---|---|---|
| Shopper | `User` (role: `user`) | `/api/user/login` | Redux `users` slice |
| Admin | `User` (role: `admin`) | `/api/user/login` (same as shopper) | Redux `users` slice |
| Seller | `Seller` (separate model) | `/api/seller/login` | Redux `seller` slice |

Admin is **not a separate model** — it's simply a `User` document with
`role: "admin"`. The JWT payload carries the role, and the frontend reads
it to decide what to show (Admin Dashboard link, Seller Dashboard link,
etc.) via route guards (`AdminRoute`, `SellerRoute`, `ProtectedRoute`).

---

## 4. Feature Breakdown by Role

### 4.1 Shopper Features

- Register / log in, with email verification and forgot/reset password
- Browse products on the Shop page with **live filtering** (category,
  price range, availability), **sorting** (price, rating), and **pagination**
- View full product details, including real customer reviews (with pagination)
- Add products to Cart and Wishlist (backed by the real database, tied to
  the logged-in user)
- Adjust quantity / remove items in the cart, with live total calculation
- Checkout through Shipping → Payment, with real Razorpay payment
  processing for multi-item orders
- Submit product reviews (rating + comment)
- Manage their own profile (view/edit name & email, change password)

### 4.2 Seller Features

- Register a business account (name, business name, GSTIN, phone, address)
  — held in `pending` status until approved
- Log in to a dedicated Seller Dashboard
- Add, edit, and delete their **own** products only (enforced on the backend
  — a seller can never touch another seller's product)
- Manage their own product categories and brands (add/edit/delete)
- View their own sales dashboard: total products listed, items sold, and
  revenue earned — scoped strictly to their own products, never
  platform-wide numbers
- View/manage their own seller profile, with logout

### 4.3 Admin Features

- Platform-wide Overview dashboard: total users, sellers, products, orders,
  and revenue
- Visual charts: monthly revenue (bar chart) and top-selling products
  (horizontal bar chart), plus a recent orders table
- Manage all registered users: view, edit (name/email/role), and delete
  (an admin can never edit or delete their own account from this list, to
  prevent accidental self-lockout)

---

## 5. Database Models (Simplified)

| Model | Key Fields |
|---|---|
| `User` | name, email, password (hashed), role (user/admin), isVerified |
| `Seller` | name, email, password, businessName, gstin, phoneNumber, address, status (pending/approved/rejected) |
| `Product` | name, price, stock, description, image, category (ref), brand (ref), seller (ref) |
| `Category` / `Brand` | name |
| `Cart` / `Wishlist` | user (ref), product (ref), quantity |
| `Order` | user (ref), items: [{ product, quantity, price }], totalPrice, status, paymentStatus, razorpayOrderId |
| `Review` | user (ref), product (ref), rating (1-5), comment |

**Note on `Order`:** one order can hold **multiple products** — each item
remembers the price at the time of purchase, so a later price change on a
product never alters historical order totals.

---

## 6. Security & Validation Highlights

- Passwords are never stored in plain text — hashed with `bcrypt` before saving
- JWTs are required on every protected route, verified via middleware
  (`verifytoken`)
- Role-based middleware (`verifyAdmin`, `verifySeller`, `verifyProductOwner`,
  `verifyAdminOrSeller`) enforces exactly who can do what, at the API level
  — not just hidden in the UI
- Razorpay payment signatures are verified server-side using HMAC SHA-256
  before an order is ever saved, so a payment can't be faked from the browser
- Email verification is required before a shopper account can log in

---

## 7. Notable Engineering Decisions

- **Multi-item orders:** the `Order` model was redesigned mid-project from
  "one product per order" to "a list of items per order," so a customer's
  entire cart can be checked out and paid for in a single transaction.
- **Timeout-protected network calls:** key data fetches (product details,
  reviews) abort after 8 seconds instead of hanging indefinitely if the
  database connection is slow, so the UI always gives clear feedback
  instead of spinning forever.
- **Session isolation:** shopper/admin sessions and seller sessions are
  kept in completely separate Redux slices and `localStorage` keys, with
  each login explicitly clearing the other, so a user is never shown a
  mismatched navigation state (e.g. seeing "Seller Dashboard" while logged
  in as a shopper).

---

## 8. Future Scope

- Order history and order cancellation on the shopper's own profile
- Seller-side order fulfillment view (see & update orders for their products)
- Admin approval workflow UI for pending sellers
- Product image upload (currently image URLs are entered manually)
- Wishlist/cart merge on login for guest sessions

---

## 9. Conclusion

GlowEssence demonstrates a complete, secure, role-based e-commerce system
built from scratch — covering authentication, a real payment gateway,
multi-vendor product management, and platform administration — with a
fully custom-designed, responsive interface.

**Built by:** Kashish, Bhumi, Ziya, and Maitri.
