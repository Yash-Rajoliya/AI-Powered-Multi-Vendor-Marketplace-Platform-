const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        logger.error("JWT verification failed", error);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

}

function authorizeVendor(req, res, next) {

    if (req.user.role !== "vendor") {

        return res.status(403).json({
            success: false,
            message: "Vendor access required"
        });

    }

    next();

}

module.exports = {
    authenticate,
    authorizeVendor
};