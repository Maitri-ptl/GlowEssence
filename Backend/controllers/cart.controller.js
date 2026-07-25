import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Add To Cart 

export const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;
        const userId = req.user.id; // Token se logged in user ki id

        // Check product exists or not
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check same product already exists in user's cart
        const cartItem = await Cart.findOne({
            user: userId,
            product: productId
        });

        if (cartItem) {

            // Product already hai to quantity increase karo
            cartItem.quantity += quantity || 1;

            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cartItem
            });

        }

        // New cart item create karo
        const cart = await Cart.create({
            user: userId,
            product: productId,
            quantity: quantity || 1
        });

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Cart 

export const getCart = async (req, res) => {

    try {

        // Logged in user ke saare cart products lao
        const cart = await Cart.find({
            user: req.user.id
        }).populate("product"); // Product details bhi aa jayegi

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Quantity 

export const updateCart = async (req, res) => {

    try {

        const { id } = req.params; // Cart document id
        const { quantity } = req.body;

        // Cart item find karo
        const cart = await Cart.findById(id);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        // Quantity update karo
        cart.quantity = quantity;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Remove Product 

export const removeCart = async (req, res) => {

    try {

        const { id } = req.params; // Cart document id

        const cart = await Cart.findById(id);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        await Cart.findByIdAndDelete(id); // Cart item delete

        return res.status(200).json({
            success: true,
            message: "Product removed from cart"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Clear Cart 

export const clearCart = async (req, res) => {

    try {

        // Logged in user ke saare cart items delete
        await Cart.deleteMany({
            user: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};