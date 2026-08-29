const { createClient } = require("redis");
const logger = require("../utils/logger");

let client;

async function connectRedis() {

    if (client) return client;

    client = createClient({
        url: process.env.REDIS_URL,
        socket: {
            reconnectStrategy: (retries) => {
                if (retries > 5) {
                    logger.error("Redis reconnect failed");
                    return new Error("Redis retry limit exceeded");
                }
                return Math.min(retries * 100, 3000);
            }
        }
    });

    client.on("connect", () => {
        logger.info("Redis connected");
    });

    client.on("error", (err) => {
        logger.error("Redis error", err);
    });

    await client.connect();

    return client;
}

module.exports = connectRedis();