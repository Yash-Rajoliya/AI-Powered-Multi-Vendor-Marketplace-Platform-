const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

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

        const token = this.generateToken(user);
        const sanitizedUser = this.sanitizeUser(user);

        return {
            user: sanitizedUser,
            token
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

        const token = this.generateToken(user);
        const sanitizedUser = this.sanitizeUser(user);

        return {
            user: sanitizedUser,
            token
        };
    }

    generateToken(user) {

        const secret = process.env.JWT_SECRET || "default_jwt_secret";

        return jwt.sign(
            {
                id: user._id || user.id,
                email: user.email,
                role: user.role
            },
            secret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );
    }

    sanitizeUser(user) {
        const userObj = user.toObject ? user.toObject() : { ...user };
        delete userObj.password;
        return userObj;
    }
}

module.exports = new AuthService();