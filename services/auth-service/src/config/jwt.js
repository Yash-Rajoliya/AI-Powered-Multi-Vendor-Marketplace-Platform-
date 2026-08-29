const jwt = require("jsonwebtoken");
const logger = require("./logger");

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

function generateAccessToken(payload) {
    try {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        });
    } catch (error) {
        logger.error("Access token generation failed", error);
        throw error;
    }
}

function generateRefreshToken(payload) {
    try {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY
        });
    } catch (error) {
        logger.error("Refresh token generation failed", error);
        throw error;
    }
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        logger.error("Access token verification failed", error);
        throw error;
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        logger.error("Refresh token verification failed", error);
        throw error;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};