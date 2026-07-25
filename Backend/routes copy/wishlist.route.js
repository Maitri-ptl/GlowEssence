import { Router } from "express";
import { addToWishlist, getWishlist, removeWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();

// Add product to wishlist
wishlistRouter.post("/add-wishlist", addToWishlist);

// Get logged in user's wishlist
wishlistRouter.get("/get-wishlist", getWishlist);

// Remove product from wishlist
wishlistRouter.delete("/remove/:id", removeWishlist);

export default wishlistRouter;