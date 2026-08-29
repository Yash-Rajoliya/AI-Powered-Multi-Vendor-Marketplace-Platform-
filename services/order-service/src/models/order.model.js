const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

    items: {
      type: [orderItemSchema],
      validate: [(val) => val.length > 0, "Order items cannot be empty"]
    },

    totalAmount: { type: Number, required: true, min: 0 },

    currency: { type: String, default: "usd", lowercase: true },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled", "completed"],
      default: "pending",
      index: true
    },

    paymentIntentId: { type: String, index: true, sparse: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);