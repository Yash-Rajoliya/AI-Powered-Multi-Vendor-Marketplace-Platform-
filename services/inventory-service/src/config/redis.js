const {createClient} = require("redis");
const logger = require("../utils/logger");

const client = createClient({
url:process.env.REDIS_URL
});

client.on("error",(err)=>{
logger.error("Redis error",err);
});

client.connect();

module.exports = client;