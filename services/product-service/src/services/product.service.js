const productRepository = require("../repositories/product.repository");
const redisCache = require("../cache/redis.cache");
const buildPagination = require("../utils/pagination");
const { publishEvent } = require("../events/product.events");
const recommendationService = require("./recommendation.service");

class ProductService {

    async createProduct(data) {

    try {

        const product = await productRepository.createProduct(data);

        // invalidate cache
        await redisCache.del("product:list");

        // update recommendation engine
        await recommendationService.updateProductVector(product);

        // publish event
        await publishEvent("product.created", {
            productId: product._id,
            vendorId: product.vendorId,
            title: product.title,
            category: product.category,
            price: product.price
        });

        logger.info(`Product created: ${product._id}`);

        return product;

    } catch (error) {

        logger.error("Product creation failed", error);

        throw error;
    }
}

    async updateProduct(productId, updateData) {

    try {

        const existingProduct = await productRepository.findById(productId);

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        const updatedProduct = await productRepository.updateProduct(
            productId,
            updateData
        );

        // invalidate cache
        await redisCache.del("product:list");

        // update recommendation engine
        await recommendationService.updateProductVector(updatedProduct);

        // publish event
        await publishEvent("product.updated", {
            productId: updatedProduct._id,
            vendorId: updatedProduct.vendorId,
            price: updatedProduct.price,
            stock: updatedProduct.stock
        });

        logger.info(`Product updated: ${productId}`);

        return updatedProduct;

    } catch (error) {

        logger.error("Product update failed", error);

        throw error;
    }
}

    async deleteProduct(productId) {

    try {

        const product = await productRepository.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        const deletedProduct = await productRepository.updateProduct(
            productId,
            { isActive: false }
        );

        // invalidate cache
        await redisCache.del("product:list");

        // remove from recommendation engine
        await recommendationService.removeProduct(productId);

        // publish event
        await publishEvent("product.deleted", {
            productId: productId,
            vendorId: product.vendorId
        });

        logger.info(`Product deleted: ${productId}`);

        return deletedProduct;

    } catch (error) {

        logger.error("Product deletion failed", error);

        throw error;
    }
}

    async listProducts(queryParams) {

    try {

        const {
            page = 1,
            limit = 10,
            category,
            minPrice,
            maxPrice,
            search,
            sort = "createdAt"
        } = queryParams;

        const pagination = buildPagination(page, limit);

        const filter = {
            isActive: true
        };

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (search) {
            filter.$text = { $search: search };
        }

        const cacheKey = `product:list:${JSON.stringify(queryParams)}`;

        const cachedProducts = await redisCache.get(cacheKey);

        if (cachedProducts) {

            logger.info("Products fetched from cache");

            return cachedProducts;
        }

        const products = await productRepository.listProducts(
            filter,
            {
                ...pagination,
                sort: { [sort]: -1 }
            }
        );

        await redisCache.set(cacheKey, products, 120);

        logger.info("Products fetched from database");

        return products;

    } catch (error) {

        logger.error("Product listing failed", error);

        throw error;
    }
}

    async vendorProducts(vendorId) {
        return await productRepository.findVendorProducts(vendorId, {});
    }

}

module.exports = new ProductService();