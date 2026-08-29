const express = require("express");
const vendorController = require("../controllers/vendor.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/onboard", authenticate, vendorController.onboardVendor);

router.get("/profile", authenticate, vendorController.getProfile);

router.put("/:id/store", authenticate, vendorController.updateStore);

router.get("/", vendorController.listVendors);

module.exports = router;