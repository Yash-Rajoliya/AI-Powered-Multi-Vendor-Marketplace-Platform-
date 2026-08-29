const logger = require("../utils/logger");

function errorMiddleware(err, req, res, next) {

    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        error: {
            message: err.message || "Internal server error",
            status: statusCode
        }

    });

}

module.exports = errorMiddleware;