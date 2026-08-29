const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    stock: {
        type: Number,
        default: 0,
        min: 0
    },

    category: {
        type: String,
        required: true,
        index: true
    },

    images: [
        {
            type: String
        }
    ],

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
}
);

productSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);