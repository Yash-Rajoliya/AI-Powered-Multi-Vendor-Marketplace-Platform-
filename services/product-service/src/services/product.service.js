const productRepository = require("../repositories/product.repository");
const redisCache = require("../cache/redis.cache");
const buildPagination = require("../utils/pagination");
const { publishEvent } = require("../events/product.events");
const recommendationService = require("./recommendation.service");
const logger = require("../utils/logger");

class ProductService {

    async createProduct(data) {
        try {
            const product = await productRepository.createProduct(data);

            // Invalidate all product list caches
            await this.invalidateProductCache(product._id);

            // Update recommendation engine
            await recommendationService.updateProductVector(product);

            // Publish event
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
                const error = new Error("Product not found");
                error.statusCode = 404;
                throw error;
            }

            const updatedProduct = await productRepository.updateProduct(
                productId,
                updateData
            );

            // Invalidate single product and list caches
            await this.invalidateProductCache(productId);

            // Update recommendation engine
            await recommendationService.updateProductVector(updatedProduct);

            // Publish event
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
                const error = new Error("Product not found");
                error.statusCode = 404;
                throw error;
            }

            const deletedProduct = await productRepository.updateProduct(
                productId,
                { isActive: false }
            );

            // Invalidate single product and list caches
            await this.invalidateProductCache(productId);

            // Remove from recommendation engine
            await recommendationService.removeProduct(productId);

            // Publish event
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

    async listProducts(queryParams = {}) {
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

    async invalidateProductCache(productId) {
        try {
            await redisCache.del(`product:${productId}`);
            await redisCache.delByPattern("product:list:*");
        } catch (error) {
            logger.error("Cache invalidation error", error);
        }
    }

}

module.exports = new ProductService();