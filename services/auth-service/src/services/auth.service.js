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
            role
        });

        const token = this.generateToken(user);

        return {
            user,
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

        await userRepository.updateLastLogin(user._id);

        const token = this.generateToken(user);

        return {
            user,
            token
        };
    }

    generateToken(user) {

        return jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );
    }
}

module.exports = new AuthService();