const { createClient } = require("redis");
const logger = require("../utils/logger");

let redisClient;

async function connectRedis() {

if(redisClient) return redisClient;

redisClient = createClient({
url: process.env.REDIS_URL
});

redisClient.on("connect",()=>{
logger.info("Redis connected");
});

redisClient.on("error",(err)=>{
logger.error("Redis error",err);
});

await redisClient.connect();

return redisClient;

}

module.exports = connectRedis();