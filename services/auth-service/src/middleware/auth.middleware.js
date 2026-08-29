const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

    try {

        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing"
            });
        }

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Forbidden: insufficient permissions"
            });

        }

        next();

    };

};

module.exports = {
    authenticate,
    authorize
};