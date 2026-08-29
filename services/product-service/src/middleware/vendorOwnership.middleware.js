const Product = require("../models/product.model");

const checkVendorOwnership = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (product.vendorId.toString() !== req.user.userId) {
        return res.status(403).json({
            message: "Not authorized"
        });
    }

    next();
};

module.exports = checkVendorOwnership;