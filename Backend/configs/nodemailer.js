import nodemailer from "nodemailer";

// Create Transporter
// Ye transporter Gmail SMTP ke through email bhejega.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // .env se Gmail Email
        user: process.env.EMAIL_USER,
        // .env se App Password
        pass: process.env.EMAIL_PASS
    }
});

export default transporter;