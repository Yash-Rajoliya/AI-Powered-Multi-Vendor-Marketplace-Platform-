const jwt = require("jsonwebtoken");
const logger = require("./logger");

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

function generateAccessToken(payload) {
    try {
        return jwt.sign(payload, ACCESS_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        });
    } catch (error) {
        logger.error?.("Access token generation failed", error);
        throw error;
    }
}

function generateRefreshToken(payload) {
    try {
        return jwt.sign(payload, REFRESH_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY
        });
    } catch (error) {
        logger.error?.("Refresh token generation failed", error);
        throw error;
    }
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, ACCESS_SECRET);
    } catch (error) {
        logger.error?.("Access token verification failed:", error.message);
        return null;
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, REFRESH_SECRET);
    } catch (error) {
        logger.error?.("Refresh token verification failed:", error.message);
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};