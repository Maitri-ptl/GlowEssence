import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import razorpay from "../configs/razorpay.js";

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {

    try {
        const { productId, quantity } = req.body;

        // Validation
        if (!productId || !quantity) {

            return res.status(400).json({

                success: false,

                message: "Product Id and Quantity are required."

            });

        }

        // Quantity negative nahi honi chahiye

        if (quantity <= 0) {

            return res.status(400).json({

                success: false,

                message: "Invalid Quantity."

            });

        }

        // Product Find
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }

        // Total Price
        const totalPrice = product.price * quantity;


        // Razorpay Amount Paisa me leta hai
        const options = {

            amount: totalPrice * 100,

            currency: "INR",

            receipt: `receipt_${Date.now()}`

        };

        // Create Razorpay Order
        const razorpayOrder = await razorpay.orders.create(options);

        // Success Response        
        return res.status(200).json({

            success: true,

            message: "Razorpay Order Created Successfully.",

            razorpayOrder,

            totalPrice

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, quantity } = req.body;

        // Validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Duplicate Payment Protection
        // Same Payment ID dobara database me save nahi hogi
        const existingOrder = await Order.findOne({

            paymentId: razorpay_payment_id

        });


        if (existingOrder) {

            return res.status(400).json({

                success: false,

                message: "Payment already verified."

            });

        }

        // Generate Signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        // Verify Signature
        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({

                success: false,

                message: "Payment Verification Failed."

            });

        }

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found."

            });

        }
        // IMPORTANT
        // Product model me stock field hona chahiye
        if (product.stock < quantity) {
            return res.status(400).json({

                success: false,

                message: "Insufficient Stock."

            });
        }

        const totalPrice = product.price * quantity;

        const order = await Order.create({

            user: req.user.id,

            product: productId,

            quantity,

            totalPrice,

            paymentId: razorpay_payment_id,

            razorpayOrderId: razorpay_order_id,

            paymentStatus: "Paid",

            status: "Confirmed"

        });

        product.stock -= quantity;

        await product.save();

        return res.status(201).json({

            success: true,

            message: "Payment Verified Successfully.",

            order

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Cancel Order + Refund
export const cancelOrder = async (req, res) => {
    try {
        // Get Order Id
        const { orderId } = req.params;

        // Find Order
        const order = await Order.findById(orderId).populate("product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Already Cancelled ?
        if (order.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order already cancelled."
            });
        }

        // Refund Only If Payment Was Successful
        if (order.paymentStatus === "Paid") {
            // Razorpay Refund API
            await razorpay.payments.refund(
                order.paymentId,
                {
                    amount: order.totalPrice * 100
                }
            );
            order.paymentStatus = "Refunded";
        }

        // Update Order Status
        order.status = "Cancelled";

        // Restore Product Stock
        const product = await Product.findById(order.product._id);

        if (product) {
            product.stock += order.quantity;
            await product.save();
        }

        // Save Changes
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled and refund processed successfully.",
            order
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};