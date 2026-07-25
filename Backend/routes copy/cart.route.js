import { Router } from "express";
import { addToCart, getCart, updateCart, removeCart, clearCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

// Add product to cart
cartRouter.post("/add-to-cart", addToCart);

// Get logged in user's cart
cartRouter.get("/get-cart", getCart);

// Update quantity using cart document id
cartRouter.patch("/update/:id", updateCart);

// Remove product from cart using cart document id
cartRouter.delete("/remove/:id", removeCart);

// Remove all products of logged in user
cartRouter.delete("/clear", clearCart);

export default cartRouter;