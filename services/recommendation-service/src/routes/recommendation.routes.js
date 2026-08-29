const express = require("express");
const controller = require("../controllers/recommendation.controller");

const router = express.Router();

router.get("/similar/:productId",controller.getSimilarProducts);

router.get("/user/:userId",controller.getRecommendedProducts);

module.exports = router;