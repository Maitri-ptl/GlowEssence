import Seller from "../models/seller.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// register seller controller
// api/seller/register
export const registerSeller = async (req, res) => {
    try {
        const error = validationResult(req);

        if (error.array().length > 0) {
            return res.status(400).json(error.array());
        }

        const { name, email, password, address, gstin, phoneNumber } = req.body;

        if (!name || !email || !password || !address || !gstin || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const sellerExist = await Seller.findOne({ $or: [{ email }, { gstin }] });

        if (sellerExist) {
            return res.status(400).json({ success: false, message: "Seller already exists with this email or GSTIN." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const seller = await Seller.create({ ...req.body, password: hashPassword });

        const sellerObj = seller.toObject();
        delete sellerObj.password;

        return res.status(200).json({ success: true, message: "Seller registered successfully. Waiting for admin approval.", seller: sellerObj });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// login seller controller
// api/seller/login
export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const seller = await Seller.findOne({ email }).select('+password');

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        const isValid = await bcrypt.compare(password, seller.password);

        if (!isValid) {
            return res.status(400).json({ success: false, message: "Password not match." });
        }

        const payload = {
            id: seller.id,
            name: seller.name,
            role: seller.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ success: true, message: "Login successfully.", sellerId: seller.id, name: seller.name, token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get logged-in seller's own profile
// api/seller/profile/:id
export const sellerProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const seller = await Seller.findById(id);

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        return res.status(200).json({ success: true, seller });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get logged-in seller's own dashboard numbers
// (how many products they have listed, and how much they've earned so far)
// api/seller/dashboard
export const sellerDashboardStats = async (req, res) => {
    try {
        const sellerId = req.user.id;

        // How many products this seller has listed
        const totalProducts = await Product.countDocuments({ seller: sellerId });

        // Get just the ids of this seller's products, so we can check
        // which order items belong to them
        const myProducts = await Product.find({ seller: sellerId }).select('_id');
        const myProductIds = myProducts.map((product) => product._id.toString());

        // Only count orders that were actually paid for
        const paidOrders = await Order.find({ paymentStatus: "Paid" });

        let totalRevenue = 0;
        let totalItemsSold = 0;

        // go through every order, and every item inside that order,
        // and add up only the ones that belong to this seller
        paidOrders.forEach((order) => {
            order.items.forEach((item) => {
                if (myProductIds.includes(item.product.toString())) {
                    totalRevenue += item.price * item.quantity;
                    totalItemsSold += item.quantity;
                }
            });
        });

        return res.status(200).json({
            success: true,
            dashboard: {
                totalProducts,
                totalRevenue,
                totalItemsSold
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// update seller's own profile
// api/seller/update/:id
export const updateSeller = async (req, res) => {
    try {
        const { id } = req.params;

        // seller should not be able to change their own role/status
        const { role, status, ...allowedUpdates } = req.body;

        if (allowedUpdates.password) {
            const salt = await bcrypt.genSalt(10);
            allowedUpdates.password = await bcrypt.hash(allowedUpdates.password, salt);
        }

        const seller = await Seller.findByIdAndUpdate(id, allowedUpdates, { new: true });

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        return res.status(200).json({ success: true, message: "Seller updated.", seller });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// delete seller's own account
// api/seller/delete/:id
export const deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;

        const seller = await Seller.findByIdAndDelete(id);

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        return res.status(200).json({ success: true, message: "Seller deleted.", sellerId: seller.id });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// ================= ADMIN-ONLY controllers =================

// get all sellers (so every newly created seller is visible to admin)
// api/admin/sellers
export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find({});

        return res.status(200).json({ success: true, message: "All sellers found.", sellers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get a single seller by id, along with ALL products created by that seller
// api/admin/sellers/:id
export const getSellerByIdForAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const seller = await Seller.findById(id);

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        const products = await Product.find({ seller: id }).populate('category').populate('brand');

        return res.status(200).json({ success: true, seller, products, totalProducts: products.length });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// admin can approve/reject a seller
// api/admin/sellers/:id/status
export const updateSellerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        const seller = await Seller.findByIdAndUpdate(id, { status }, { new: true });

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        return res.status(200).json({ success: true, message: `Seller ${status}.`, seller });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// admin deletes any seller
// api/admin/sellers/:id
export const deleteSellerByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const seller = await Seller.findByIdAndDelete(id);

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found." });
        }

        return res.status(200).json({ success: true, message: "Seller deleted by admin.", sellerId: seller.id });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
