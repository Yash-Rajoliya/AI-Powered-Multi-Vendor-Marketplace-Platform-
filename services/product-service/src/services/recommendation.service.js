const axios = require("axios");
const logger = require("../utils/logger");

class RecommendationService {

    async updateProductVector(product) {

        try {

            await axios.post(
                `${process.env.RECOMMENDATION_SERVICE_URL}/recommendation/index`,
                {
                    productId: product._id,
                    title: product.title,
                    category: product.category,
                    price: product.price
                }
            );

            logger.info("Recommendation index updated");

        } catch (error) {

            logger.error("Recommendation service error", error.message);

        }

    }

    async removeProduct(productId) {

        try {

            await axios.delete(
                `${process.env.RECOMMENDATION_SERVICE_URL}/recommendation/${productId}`
            );

            logger.info("Product removed from recommendation engine");

        } catch (error) {

            logger.error("Recommendation deletion error", error.message);

        }

    }

}

module.exports = new RecommendationService();