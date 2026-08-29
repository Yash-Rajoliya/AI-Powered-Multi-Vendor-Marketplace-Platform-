const { createClient } = require("redis");
const logger = require("../utils/logger");

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("connect", () => {
  logger.info("Redis connected for notification service");
});

redisClient.on("error", (err) => {
  logger.error("Redis error", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;