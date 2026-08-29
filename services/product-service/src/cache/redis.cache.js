const redis = require("../config/redis.config");
const logger = require("../utils/logger");

class RedisCache {
    async get(key) {
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            logger.error(`Redis GET error for key ${key}:`, error);
            return null;
        }
    }

    async set(key, value, ttlSeconds = 120) {
        try {
            const stringValue = JSON.stringify(value);
            if (ttlSeconds) {
                await redis.setex(key, ttlSeconds, stringValue);
            } else {
                await redis.set(key, stringValue);
            }
        } catch (error) {
            logger.error(`Redis SET error for key ${key}:`, error);
        }
    }

    async del(key) {
        try {
            await redis.del(key);
        } catch (error) {
            logger.error(`Redis DEL error for key ${key}:`, error);
        }
    }

    async delByPattern(pattern) {
        try {
            const keys = await redis.keys(pattern);
            if (keys && keys.length > 0) {
                await redis.del(keys);
            }
        } catch (error) {
            logger.error(`Redis DEL pattern error for ${pattern}:`, error);
        }
    }
}

module.exports = new RedisCache();