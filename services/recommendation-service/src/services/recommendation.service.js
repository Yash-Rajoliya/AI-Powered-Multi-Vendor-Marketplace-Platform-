const collaborative = require("./collaborativeFiltering");
const similarity = require("./similarityEngine");
const ranking = require("./ranking.service");
const repository = require("../repositories/behavior.repository");
const cache = require("../cache/recommendation.cache");

class RecommendationService {

  async getSimilarProducts(productId) {
    const cached = await cache.getSimilar(productId);
    if (cached) return cached;

    const products = await similarity.getSimilarProducts(productId);

    // Store sliced results in cache with configured TTL
    const topProducts = products.slice(0, 10);
    await cache.setSimilar(productId, topProducts);

    return topProducts;
  }

  async getRecommendedProducts(userId) {
    const cached = await cache.getUserRecommendations(userId);
    if (cached) return cached;

    const similarUsers = await collaborative.getSimilarUsers(userId);

    let candidateProducts = [];

    for (const user of similarUsers) {
      const interactions = await repository.getUserInteractions(user);

      candidateProducts.push(
        ...interactions.map(i => i.productId.toString())
      );
    }

    const userInteractions = await repository.getUserInteractions(userId);

    const ranked = ranking.rankProductsForUser(
      candidateProducts,
      userInteractions
    );

    // Slice top recommendations BEFORE caching to avoid storing huge candidates
    const topRecommendations = ranked.slice(0, 10);

    await cache.setUserRecommendations(userId, topRecommendations);

    return topRecommendations;
  }

  async invalidateUserRecommendations(userId) {
    await cache.delUserRecommendations(userId);
  }

}

module.exports = new RecommendationService();