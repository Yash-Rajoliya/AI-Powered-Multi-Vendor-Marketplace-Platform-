const productService = require("../services/product.service");

class ProductController {

    async createProduct(req, res, next) {

        try {

            const vendorId = req.user.userId;

            const product = await productService.createProduct({
                ...req.body,
                vendorId
            });

            res.status(201).json({
                success: true,
                data: product
            });

        } catch (error) {
            next(error);
        }

    }

    async updateProduct(req, res, next) {

        try {

            const { id } = req.params;

            const updated = await productService.updateProduct(id, req.body);

            res.json({
                success: true,
                data: updated
            });

        } catch (error) {
            next(error);
        }

    }

    async deleteProduct(req, res, next) {

        try {

            const { id } = req.params;

            await productService.deleteProduct(id);

            res.json({
                success: true,
                message: "Product deleted"
            });

        } catch (error) {
            next(error);
        }

    }

    async listProducts(req, res, next) {

        try {

            const products = await productService.listProducts(req.query);

            res.json({
                success: true,
                data: products
            });

        } catch (error) {
            next(error);
        }

    }

    async vendorProducts(req, res, next) {

        try {

            const vendorId = req.user.userId;

            const products = await productService.vendorProducts(vendorId);

            res.json({
                success: true,
                data: products
            });

        } catch (error) {
            next(error);
        }

    }

}

module.exports = new ProductController();