const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
{
    vendorName: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        unique: true,
        index: true
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },

    storeDescription: {
        type: String,
        default: ""
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    verificationStatus: {
        type: String,
        enum: ["pending","approved","rejected"],
        default: "pending"
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
}
);

vendorSchema.index({ vendorName: "text", storeDescription: "text" });

module.exports = mongoose.model("Vendor", vendorSchema);