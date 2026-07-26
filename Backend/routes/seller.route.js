import { Router } from "express";
import { deleteSeller, loginSeller, registerSeller, sellerDashboardStats, sellerProfile, updateSeller } from "../controllers/seller.controller.js";
import { sellerValidation } from "../middlewares/validation.js";
import { verifySeller, verifySellerSelf, verifytoken } from "../middlewares/auth.middleware.js";

const sellerRouter = Router();

// register seller
// api/seller/register
sellerRouter.post('/register', sellerValidation, registerSeller);

// login seller
// api/seller/login
sellerRouter.post('/login', loginSeller);

// get own profile
// api/seller/profile/:id
sellerRouter.get('/profile/:id', verifytoken, verifySeller, verifySellerSelf, sellerProfile);

// get own dashboard numbers (total products, total revenue)
// api/seller/dashboard
sellerRouter.get('/dashboard', verifytoken, verifySeller, sellerDashboardStats);

// update own profile
// api/seller/update/:id
sellerRouter.patch('/update/:id', verifytoken, verifySeller, verifySellerSelf, updateSeller);

// delete own account
// api/seller/delete/:id
sellerRouter.delete('/delete/:id', verifytoken, verifySeller, verifySellerSelf, deleteSeller);

export default sellerRouter;
