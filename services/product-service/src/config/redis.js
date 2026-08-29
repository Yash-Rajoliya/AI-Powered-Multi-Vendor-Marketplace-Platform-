const redis = require("redis");
const logger = require("../utils/logger");

let client;

async function connectRedis() {

    try {

        client = redis.createClient({
            url: process.env.REDIS_URL
        });

        client.on("error", (err) => {
            logger.error("Redis error", err);
        });

        await client.connect();

        logger.info("Redis connected");

    } catch (error) {

        logger.error("Redis connection failed", error);

        process.exit(1);

    }
}

function getRedisClient() {
    if (!client) {
        throw new Error("Redis client not initialized");
    }
    return client;
}

module.exports = connectRedis;
module.exports.getRedisClient = getRedisClient;