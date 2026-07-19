import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
    try {
        const Bearer = req.headers.authorization;

        if (!Bearer || !Bearer.startsWith('Bearer')) {
            return res.status(400).json({ success: false, message: "Invalid Token." });
        }

        const token = Bearer.split(' ')[1];

        try {
            if (!token) {
                return res.status(400).json({ success: false, message: "Token not provided." })
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;

            return next();
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(400).json({ success: false, message: "Please login again." })
            }
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const verifyUser = (req, res, next) => {
    const { id } = req.params;

    if (req.user.id == id) {
        return next();
    }

    return res.status(400).json({ success: false, message: "Unauthorized" })
}

export const verifyAdmin = (req, res, next) => {
    if (req.user.role == 'admin') {
        return next();
    }

    return res.status(400).json({ success: false, message: "Admin access only" })
}