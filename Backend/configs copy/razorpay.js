import Razorpay from "razorpay";

// Create Razorpay Instance
// Is instance ka use hum order create aur refund ke liye karenge

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default razorpay;