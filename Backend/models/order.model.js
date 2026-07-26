import mongoose from "mongoose";

// one order can now hold MULTIPLE products (like a real cart checkout)
// so instead of a single "product" + "quantity" field,
// we store a list of items, each with its own product, quantity and price
const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        // price of ONE unit at the time of order (so it doesn't change later
        // even if the product price changes in future)
        price: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // list of all products bought in this single order
        items: {
            type: [orderItemSchema],
            required: true
        },

        // total price of ALL items combined
        totalPrice: {
            type: Number,
            required: true
        },

        // Order Status
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        },

        // Razorpay Payment Id
        paymentId: {
            type: String,
            default: ""
        },

        // Razorpay Order Id
        razorpayOrderId: {
            type: String,
            default: ""
        },

        // Payment Status
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        }

    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
