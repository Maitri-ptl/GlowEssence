import { Router } from "express";
import { validation } from "../middlewares/validation.js";
import { login, register } from "../controllers/user.controller.js";

const adminRouter = Router();

// register admin route
// api/admin/register
adminRouter.post("/register", validation, register);

// login admin route
// api/admin/login
adminRouter.post("/login", login);

export default adminRouter;