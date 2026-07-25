import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

// Add To Wishlist

export const addToWishlist = async (req, res) => {
    try {

        const { productId } = req.body;
        const userId = req.user.id; // Logged in user

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check product already exists in wishlist
        const wishlist = await Wishlist.findOne({
            user: userId,
            product: productId
        });

        if (wishlist) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        // Create wishlist item
        const newWishlist = await Wishlist.create({
            user: userId,
            product: productId
        });

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            newWishlist
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Wishlist

export const getWishlist = async (req, res) => {

    try {

        // Get logged in user's wishlist
        const wishlist = await Wishlist.find({
            user: req.user.id
        }).populate("product"); // Show product details

        return res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Remove From Wishlist

export const removeWishlist = async (req, res) => {

    try {

        const { id } = req.params; // Wishlist document id

        const wishlist = await Wishlist.findById(id);

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });
        }

        await Wishlist.findByIdAndDelete(id); // Delete wishlist item

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};