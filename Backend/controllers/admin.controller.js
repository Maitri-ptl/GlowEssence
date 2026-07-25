import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";


// Dashboard Summary API
// GET : /api/admin/dashboard

export const dashboardSummary = async (req, res) => {

    try {

        // Total Users Count

        const totalUsers = await User.countDocuments();

        // countDocuments() collection me total documents count karta hai


        // Total Sellers Count

        const totalSellers = await Seller.countDocuments();


        // Total Products Count

        const totalProducts = await Product.countDocuments();


        // Total Orders Count

        const totalOrders = await Order.countDocuments();


        // Total Revenue

        // totalPrice field ka sum nikalenge

        const revenue = await Order.aggregate([

            {
                $group: {

                    _id: null,

                    totalRevenue: {
                        $sum: "$totalPrice"
                    }

                }
            }

        ]);


        // Agar koi order hi nahi hai
        // to revenue 0 kar do

        const totalRevenue =
            revenue.length > 0
                ? revenue[0].totalRevenue
                : 0;


        // Final Response

        return res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalSellers,

                totalProducts,

                totalOrders,

                totalRevenue

            }

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Recent Orders
// GET : /api/admin/recent-orders

export const recentOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            // User details
            .populate("user", "name email")

            // Product details
            .populate("product", "name image price")

            // Latest first
            .sort({ createdAt: -1 })

            // Sirf latest 5 orders
            .limit(5);


        return res.status(200).json({

            success: true,

            orders

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Top Selling Products
// GET : /api/admin/top-products

export const topProducts = async (req, res) => {

    try {

        const products = await Order.aggregate([

            // Same product ki quantity add karenge
            {
                $group: {

                    _id: "$product",

                    totalSold: {

                        $sum: "$quantity"

                    }

                }

            },

            // Highest quantity first
            {
                $sort: {

                    totalSold: -1

                }

            },

            // Top 5
            {
                $limit: 5
            },

            // Product details join
            {
                $lookup: {

                    from: "products",

                    localField: "_id",

                    foreignField: "_id",

                    as: "product"

                }

            },

            {
                $unwind: "$product"
            }

        ]);


        return res.status(200).json({

            success: true,

            products

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Monthly Revenue
// GET : /api/admin/monthly-revenue

export const monthlyRevenue = async (req, res) => {

    try {

        const revenue = await Order.aggregate([

            {

                $group: {

                    _id: {

                        month: {

                            $month: "$createdAt"

                        }

                    },

                    revenue: {

                        $sum: "$totalPrice"

                    }

                }

            },

            {

                $sort: {

                    "_id.month": 1

                }

            }

        ]);


        return res.status(200).json({

            success: true,

            revenue

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};