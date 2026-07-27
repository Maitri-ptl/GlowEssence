import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        gstin: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        // extra fields (business info)
        businessName: {
            type: String,
            trim: true,
        },

        role: {
            type: String,
            enum: ["seller"],
            default: "seller",
        },

        // sellers are active as soon as they register - no admin approval
        // step is required
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "approved",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;