const Product = require("../models/product.model");

class ProductRepository {

    async createProduct(data) {
        return await Product.create(data);
    }

    async updateProduct(productId, data) {
        return await Product.findByIdAndUpdate(productId, data, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }

    async findById(productId) {
        return await Product.findById(productId);
    }

    async findVendorProducts(vendorId, query) {
        return await Product.find({ vendorId, ...query });
    }

    async listProducts(query, options) {
        return await Product.find(query)
            .skip(options.skip)
            .limit(options.limit)
            .sort(options.sort);
    }

}

module.exports = new ProductRepository();