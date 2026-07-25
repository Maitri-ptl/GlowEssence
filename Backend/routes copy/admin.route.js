import { Router } from "express";
import { validation } from "../middlewares/validation.js";
import { login, register } from "../controllers/user.controller.js";
import { deleteSellerByAdmin, getAllSellers, getSellerByIdForAdmin, updateSellerStatus } from "../controllers/seller.controller.js";
import { verifyAdmin, verifytoken } from "../middlewares/auth.middleware.js";
import { dashboardSummary, monthlyRevenue, recentOrders, topProducts } from "../controllers/admin.controller.js";

const adminRouter = Router();

// register admin route
// api/admin/register
adminRouter.post("/register", validation, register);

// login admin route
// api/admin/login
adminRouter.post("/login", login);

// Dashboard APIs

// Dashboard Summary
adminRouter.get("/dashboard", verifytoken, verifyAdmin, dashboardSummary);

// Recent Orders
adminRouter.get("/recent-orders", verifytoken, verifyAdmin, recentOrders);

// Top Selling Products
adminRouter.get("/top-products", verifytoken, verifyAdmin, topProducts);

// Monthly Revenue
adminRouter.get("/monthly-revenue", verifytoken, verifyAdmin, monthlyRevenue);

// ===== Seller management (admin only, needs token + admin role) =====

// get every seller that has registered
// api/admin/sellers
adminRouter.get("/sellers", verifytoken, verifyAdmin, getAllSellers);

// get one seller + ALL of their products
// api/admin/sellers/:id
adminRouter.get("/sellers/:id", verifytoken, verifyAdmin, getSellerByIdForAdmin);

// approve / reject a seller
// api/admin/sellers/:id/status
adminRouter.patch("/sellers/:id/status", verifytoken, verifyAdmin, updateSellerStatus);

// remove a seller
// api/admin/sellers/:id
adminRouter.delete("/sellers/:id", verifytoken, verifyAdmin, deleteSellerByAdmin);

export default adminRouter;
