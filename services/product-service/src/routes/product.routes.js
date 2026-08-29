const express = require("express");
const productController = require("../controllers/product.controller");
const { authenticate } = require("../../auth-service/src/middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, (req, res, next) =>
    productController.createProduct(req, res, next)
);

router.put("/:id", authenticate, (req, res, next) =>
    productController.updateProduct(req, res, next)
);

router.delete("/:id", authenticate, (req, res, next) =>
    productController.deleteProduct(req, res, next)
);

router.get("/", (req, res, next) =>
    productController.listProducts(req, res, next)
);

router.get("/vendor", authenticate, (req, res, next) =>
    productController.vendorProducts(req, res, next)
);

module.exports = router;