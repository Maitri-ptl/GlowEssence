import { Router } from "express";
import { cancelOrder, createRazorpayOrder, verifyPayment } from "../controllers/order.controller.js";
import { verifytoken } from "../middlewares/auth.middleware.js";

const orderRouter = Router();

// Create Razorpay Order
orderRouter.post("/create-order", verifytoken, createRazorpayOrder);

// Verify Payment
orderRouter.post("/verify-payment", verifytoken, verifyPayment);

// cancel order
orderRouter.put("/cancel/:orderId", verifytoken, cancelOrder);
export default orderRouter;