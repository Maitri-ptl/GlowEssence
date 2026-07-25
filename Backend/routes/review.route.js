import { Router } from "express";
import { addReview, getReviews, updateReview, deleteReview } from "../controllers/review.controller.js";

const reviewRouter = Router();

// Add review
reviewRouter.post("/add-review", addReview);

// Get all reviews of product
reviewRouter.get("/all-reviews/:productId", getReviews);

// Update own review
reviewRouter.patch("/update/:id", updateReview);

// Delete own review
reviewRouter.delete("/delete/:id", deleteReview);

export default reviewRouter;