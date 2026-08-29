const redis = require("../config/redis");

class InventoryCache {

async get(productId){

const data = await redis.get(`inventory:${productId}`);

if(!data) return null;

return JSON.parse(data);

}

async set(productId,data){

await redis.set(
`inventory:${productId}`,
JSON.stringify(data),
{EX:300}
);

}

async invalidate(productId){

await redis.del(`inventory:${productId}`);

}

}

module.exports = new InventoryCache();