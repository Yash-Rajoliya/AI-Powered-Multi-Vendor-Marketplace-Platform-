const redis = require("../config/redis.config");
const logger = require("../utils/logger");

// Dynamic TTL configurations in seconds
const SIMILAR_PRODUCTS_TTL = parseInt(process.env.SIMILAR_PRODUCTS_CACHE_TTL, 10) || 3600; // 1 hour
const USER_RECOMMENDATIONS_TTL = parseInt(process.env.USER_RECOMMENDATIONS_CACHE_TTL, 10) || 1800; // 30 mins

class RecommendationCache {

  async getSimilar(productId) {
    try {
      const data = await redis.get(`cache:similar:${productId}`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error?.("Redis error fetching similar products cache:", err);
      return null;
    }
  }

  async setSimilar(productId, products, ttl = SIMILAR_PRODUCTS_TTL) {
    try {
      await redis.setex(
        `cache:similar:${productId}`,
        ttl,
        JSON.stringify(products)
      );
    } catch (err) {
      logger.error?.("Redis error setting similar products cache:", err);
    }
  }

  async getUserRecommendations(userId) {
    try {
      const data = await redis.get(`cache:recommendations:${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error?.("Redis error fetching user recommendations cache:", err);
      return null;
    }
  }

  async setUserRecommendations(userId, recommendations, ttl = USER_RECOMMENDATIONS_TTL) {
    try {
      await redis.setex(
        `cache:recommendations:${userId}`,
        ttl,
        JSON.stringify(recommendations)
      );
    } catch (err) {
      logger.error?.("Redis error setting user recommendations cache:", err);
    }
  }

  async delUserRecommendations(userId) {
    try {
      await redis.del(`cache:recommendations:${userId}`);
    } catch (err) {
      logger.error?.("Redis error clearing user recommendations cache:", err);
    }
  }

}

module.exports = new RecommendationCache();