import { Router } from "express";
import { changePassword, deleteUser, forgotPassword, getAllUser, login, profile, register, resetPassword, updateUser, verifyEmail } from "../controllers/user.controller.js";
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

// Forgot Password Route (sends reset link to email)
// api/user/forgot-password
userRouter.post('/forgot-password', forgotPassword);

// Reset Password Route (sets the new password using the token from email)
// api/user/reset-password/:token
userRouter.post('/reset-password/:token', resetPassword);

// get all user route
// api/user/getalluser
userRouter.get('/getalluser', verifytoken, verifyAdmin, getAllUser);

// get user by id route
// api/user/profile/:id
userRouter.get('/profile/:id', verifytoken, verifyUser, profile);

// update user route
// api/user/update/:id
userRouter.patch('/update/:id', verifytoken, verifyUser, updateUser);

// change password route (needs current password, used by Security tab)
// api/user/change-password/:id
userRouter.patch('/change-password/:id', verifytoken, verifyUser, changePassword);

// delete user route
// api/user/delete/:id
userRouter.delete('/delete/:id', verifytoken, verifyUser, deleteUser);

export default userRouter;