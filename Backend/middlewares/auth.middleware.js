import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";

export const verifytoken = (req, res, next) => {
    try {
        const Bearer = req.headers.authorization;

        if (!Bearer || !Bearer.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: "Invalid Token." });
        }

        const token = Bearer.split(' ')[1];

        try {
            if (!token) {
                return res.status(400).json({ success: false, message: "Token not provided." })
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;

            return next();
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(400).json({ success: false, message: "Please login again." })
            }

            // any other jwt error (invalid signature, malformed token, etc.)
            // must also respond, otherwise the request just hangs forever
            return res.status(400).json({ success: false, message: "Invalid Token." })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const verifyUser = (req, res, next) => {
    const { id } = req.params;

    if (req.user.id == id) {
        return next();
    }

    return res.status(400).json({ success: false, message: "Unauthorized" })
}

export const verifyAdmin = (req, res, next) => {
    if (req.user.role == 'admin') {
        return next();
    }

    return res.status(400).json({ success: false, message: "Admin access only" })
}

// only logged in sellers can pass (used before create/update/delete product routes)
export const verifySeller = (req, res, next) => {
    if (req.user.role == 'seller') {
        return next();
    }

    return res.status(400).json({ success: false, message: "Seller access only" })
}

// lets either an admin OR a seller through (used for category/brand
// create/update/delete, since sellers manage their own catalog too)
export const verifyAdminOrSeller = (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'seller') {
        return next();
    }

    return res.status(400).json({ success: false, message: "Admin or seller access only" })
}

// allows a seller to access only their own /profile/:id or /update/:id etc.
export const verifySellerSelf = (req, res, next) => {
    const { id } = req.params;

    if (req.user.id == id) {
        return next();
    }

    return res.status(400).json({ success: false, message: "Unauthorized" })
}

// makes sure a seller can only update/delete a PRODUCT that belongs to them
// admin is always allowed through
export const verifyProductOwner = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        if (req.user.role == 'admin') {
            return next();
        }

        if (req.user.role == 'seller' && product.seller.toString() == req.user.id) {
            return next();
        }

        return res.status(403).json({ success: false, message: "You can only manage your own products" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}