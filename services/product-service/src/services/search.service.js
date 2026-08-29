const Product = require("../models/product.model");

class SearchService {

    async searchProducts(keyword, filters) {

        const query = {
            $text: { $search: keyword },
            isActive: true
        };

        if (filters.category) {
            query.category = filters.category;
        }

        return await Product.find(query)
            .limit(20)
            .sort({ score: { $meta: "textScore" } });
    }

}

module.exports = new SearchService();