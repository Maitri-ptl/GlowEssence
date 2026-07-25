import { Router } from "express";
import { deleteUser, getAllUser, login, profile, register, updateUser, verifyEmail } from "../controllers/user.controller.js";
import { validation } from "../middlewares/validation.js";
import { verifyAdmin, verifytoken, verifyUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// register user route
// api/user/register
userRouter.post("/register", validation, register);

// Verify Email Route
// api/user/verify-email/:token
userRouter.get("/verify-email/:token", verifyEmail);

//login user route
//api/user/login
userRouter.post('/login', login);

// get all user route
// api/user/getalluser
userRouter.get('/getalluser', verifytoken, verifyAdmin, getAllUser);

// get user by id route
// api/user/profile/:id
userRouter.get('/profile/:id', verifytoken, verifyUser, profile);

// update user route
// api/user/update/:id
userRouter.patch('/update/:id', verifytoken, verifyUser, updateUser);

// delete user route
// api/user/delete/:id
userRouter.delete('/delete/:id', verifytoken, verifyUser, deleteUser);

export default userRouter;