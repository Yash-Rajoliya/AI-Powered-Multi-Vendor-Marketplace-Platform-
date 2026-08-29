const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const userId = req.user?.id || req.user?._id || "anonymous";

    logger.info?.(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms [User: ${userId}]`
    );
  });

  next();
};

module.exports = requestLogger;