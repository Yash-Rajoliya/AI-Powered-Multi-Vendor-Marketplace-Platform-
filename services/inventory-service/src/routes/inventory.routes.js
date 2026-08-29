const express = require("express");
const controller = require("../controllers/inventory.controller");

const router = express.Router();

router.get("/:productId",controller.checkStock);
router.put("/:productId/stock",controller.updateStock);
router.post("/reserve",controller.reserveInventory);

module.exports = router;