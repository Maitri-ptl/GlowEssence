import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// register user controller
// api/user/register
export const register = async (req, res) => {
    try {
        const error = validationResult(req);

        if (error.array().length > 0) {
            return res.status(400).json(error.array())
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist." });
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt)

        const user = await User.create({ ...req.body, password: hashPassword });

        return res.status(200).json({ success: true, message: "Register successfully.", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
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