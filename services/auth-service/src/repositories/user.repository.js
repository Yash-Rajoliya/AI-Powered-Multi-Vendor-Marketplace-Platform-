const User = require("../models/user.model");

class UserRepository {

    async createUser(data) {
        const user = new User(data);
        return await user.save();
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select("+password");
    }

    async findById(id) {
        return await User.findById(id);
    }

    async updateLastLogin(userId) {
        return await User.findByIdAndUpdate(
            userId,
            { lastLoginAt: new Date() },
            { new: true }
        );
    }

}

module.exports = new UserRepository();