import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SellerRegister from "../pages/auth/SellerRegister";
import SellerLogin from "../pages/auth/SellerLogin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "../pages/profile/Profile";
import ProductDetails from "../pages/product/ProductDetails";
import Cart from "../pages/cart/Cart";
import Shipping from "../pages/checkout/Shipping";
import Payment from "../pages/checkout/Payment";
import Wishlist from "../pages/wishlist/Wishlist";
import NotFound from "../pages/error/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/shipping" element={<Shipping />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
