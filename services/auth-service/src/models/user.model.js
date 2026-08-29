const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },

    role: {
        type: String,
        enum: ["user", "vendor"],
        default: "user",
        index: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastLoginAt: {
        type: Date
    }
},
{
    timestamps: true
}
);

/**
 * Remove sensitive fields before returning user
 */
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", userSchema);