import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

// Add Review

export const addReview = async (req, res) => {

    try {

        const { productId, rating, comment } = req.body;
        const userId = req.user.id; // Logged in user

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check user already reviewed
        const existingReview = await Review.findOne({
            user: userId,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product"
            });
        }

        // Create review
        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment
        });

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Product Reviews

export const getReviews = async (req, res) => {

    try {

        const { productId } = req.params;

        // Get all reviews of selected product
        const reviews = await Review.find({
            product: productId
        }).populate("user", "name email"); // Show only name & email

        return res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Review

export const updateReview = async (req, res) => {

    try {

        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // User can update only own review
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        review.rating = rating;
        review.comment = comment;

        await review.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Review

export const deleteReview = async (req, res) => {

    try {

        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // User can delete only own review
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Review.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};