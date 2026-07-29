import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import connectDB from "./configs/db.js";

const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an origin
            // such as Postman/server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GlowEssence backend is running.",
    });
});

app.use("/api", router);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();