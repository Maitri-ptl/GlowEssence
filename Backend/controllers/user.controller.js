import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
// Random token generate karne ke liye
import crypto from "crypto";
// Email send karne ke liye
import transporter from "../configs/nodemailer.js";

// register user controller
// api/user/register

export const register = async (req, res) => {

    try {

        // Validation Errors
        const error = validationResult(req);

        if (error.array().length > 0) {

            return res.status(400).json(error.array());

        }

        // Body se data lena
        const { name, email, password } = req.body;


        // Required Fields Check
        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }


        // Check User Exists
        const userExist = await User.findOne({ email });

        if (userExist) {

            return res.status(400).json({

                success: false,

                message: "User already exists."

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        // Random 32 byte token banega
        const verificationToken = crypto.randomBytes(32).toString("hex");


        // Token 1 hour baad expire hoga
        const verificationTokenExpire = Date.now() + 60 * 60 * 1000;

        const user = await User.create({

            name,

            email,

            password: hashPassword,

            verificationToken,

            verificationTokenExpire

        });

        // Frontend URL baad me change kar dena
        const verificationURL =
            `http://localhost:3000/api/user/verify-email/${verificationToken}`;

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: user.email,

            subject: "Verify Your Email",

            html: `

                <h2>Hello ${user.name}</h2>

                <p>Click the button below to verify your email.</p>

                <a href="${verificationURL}">

                    <button
                        style="
                            padding:10px 20px;
                            background:#4CAF50;
                            color:white;
                            border:none;
                            cursor:pointer;
                        ">
                        Verify Email
                    </button>

                </a>

                <p>This link will expire in 1 hour.</p>

            `

        });

        return res.status(201).json({

            success: true,

            message: "Registration successful. Please check your email to verify your account."

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Verify Email Controller
// /api/user/verify-email/:token

export const verifyEmail = async (req, res) => {

    try {

        // URL se token nikal rahe hain
        const { token } = req.params;

        // Token match hona chahiye
        // Aur token expire bhi nahi hona chahiye

        const user = await User.findOne({

            verificationToken: token,

            verificationTokenExpire: { $gt: Date.now() }

        });


        // Agar token galat hai ya expire ho gaya
        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid or Expired Verification Link."

            });

        }

        user.isVerified = true;

        // Token remove kar denge
        user.verificationToken = "";

        user.verificationTokenExpire = null;


        await user.save();

        return res.status(200).json({

            success: true,

            message: "Email Verified Successfully. You can now login."

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

// login user controller
// api/user/login
export const login = async (req, res) => {
    try {
        const error = validationResult(req);

        if (error.array().length > 0) {
            return res.status(400).json(error.array())
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ success: false, message: "Password not match" });
        }

        // Agar email verify nahi hui hai
        // To login allow nahi karenge

        if (!user.isVerified) {

            return res.status(400).json({

                success: false,

                message: "Please verify your email before login."

            });

        }

        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ success: true, message: "Login successfully.", userId: user.id, name: user.name, token })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get all user controller
// api/user/getalluser
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        if (!users) {
            return res.status(400).json({ success: false, message: "No users found." });
        }

        return res.status(200).json({ success: true, message: "All users found.", users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get user by id controller
// api/user/profile/:id
export const profile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, message: "User found.", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// update user controller
// api/user/update/:id
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, message: "User updated.", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// delete user controller
// api/user/delete/:id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, message: "User deleted.", userId: user.id });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}