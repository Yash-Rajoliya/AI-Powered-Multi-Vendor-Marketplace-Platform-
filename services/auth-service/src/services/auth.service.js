const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/jwt");

class AuthService {

    async register(payload) {
        const { name, email, password, role } = payload;

        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            const error = new Error("User already exists with this email");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await userRepository.createUser({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        const tokens = this.generateTokens(user);
        const sanitizedUser = this.sanitizeUser(user);

        return {
            user: sanitizedUser,
            ...tokens
        };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        if (user._id) {
            await userRepository.updateLastLogin(user._id);
        }

        const tokens = this.generateTokens(user);
        const sanitizedUser = this.sanitizeUser(user);

        return {
            user: sanitizedUser,
            ...tokens
        };
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            const error = new Error("Refresh token is required");
            error.statusCode = 400;
            throw error;
        }

        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            const error = new Error("Invalid or expired refresh token");
            error.statusCode = 401;
            throw error;
        }

        const user = await userRepository.findById(decoded.id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const newAccessToken = generateAccessToken({
            id: user._id || user.id,
            email: user.email,
            role: user.role
        });

        return { accessToken: newAccessToken };
    }

    generateTokens(user) {
        const tokenPayload = {
            id: user._id || user.id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        return { accessToken, refreshToken };
    }

    sanitizeUser(user) {
        const userObj = user.toObject ? user.toObject() : { ...user };
        delete userObj.password;
        return userObj;
    }
}

module.exports = new AuthService();