const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * Authentication routes
 */

router.post("/register", (req, res, next) =>
    authController.register(req, res, next)
);

router.post("/login", (req, res, next) =>
    authController.login(req, res, next)
);

module.exports = router;