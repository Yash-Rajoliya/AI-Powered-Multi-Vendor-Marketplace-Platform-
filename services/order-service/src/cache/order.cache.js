const redis = require("../config/redis");

class OrderCache {

async get(userId){

const data =
await redis.get(`orders:${userId}`);

return data ? JSON.parse(data) : null;

}

async set(userId,data){

await redis.set(
`orders:${userId}`,
JSON.stringify(data),
"EX",
120
);

}

}

module.exports = new OrderCache();