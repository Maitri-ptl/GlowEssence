import { Router } from "express";
import userRouter from "./user.route.js";
import adminRouter from "./admin.route.js";
import categoryRouter from "./category.route.js";
import { verifyAdmin, verifytoken } from "../middlewares/auth.middleware.js";
import productRouter from "./product.route.js";
import brandRouter from "./brand.route.js";
import sellerRouter from "./seller.route.js";
import cartRouter from "./cart.route.js";
import wishlistRouter from "./wishlist.route.js";
import reviewRouter from "./review.route.js";
import orderRouter from "./order.route.js";

const router = Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/seller', sellerRouter);
router.use('/category', verifytoken, verifyAdmin, categoryRouter);
router.use('/brand', verifytoken, verifyAdmin, brandRouter);
router.use('/product', productRouter);
router.use('/cart', verifytoken, cartRouter);
router.use("/wishlist", verifytoken, wishlistRouter);
router.use("/review", verifytoken, reviewRouter);
router.use("/order", verifytoken, orderRouter);

export default router