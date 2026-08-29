const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.connect();

class RedisCache {

    async get(key) {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key, value, ttl = 60) {
        await client.set(key, JSON.stringify(value), {
            EX: ttl
        });
    }

    async del(key) {
        await client.del(key);
    }

}

module.exports = new RedisCache();