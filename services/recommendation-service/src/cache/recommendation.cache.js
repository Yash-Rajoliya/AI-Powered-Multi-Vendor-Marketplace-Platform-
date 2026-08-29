const redis = require("../config/redis");

class RecommendationCache{

async getSimilar(productId){

const data = await redis.get(`similar:${productId}`);

return data ? JSON.parse(data) : null;

}

async setSimilar(productId,data){

await redis.set(
`similar:${productId}`,
JSON.stringify(data),
{EX:600}
);

}

async getUserRecommendations(userId){

const data = await redis.get(`rec:${userId}`);

return data ? JSON.parse(data) : null;

}

async setUserRecommendations(userId,data){

await redis.set(
`rec:${userId}`,
JSON.stringify(data),
{EX:600}
);

}

}

module.exports = new RecommendationCache();