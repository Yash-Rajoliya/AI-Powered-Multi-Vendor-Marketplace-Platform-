const express = require("express");
const controller = require("../controllers/order.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, controller.createOrder);
router.get("/my-orders", authenticate, controller.getUserOrders);

module.exports = router;