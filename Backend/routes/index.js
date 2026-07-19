import { Router } from "express";
import userRouter from "./user.route.js";
import adminRouter from "./admin.route.js";

const router = Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);

export default router