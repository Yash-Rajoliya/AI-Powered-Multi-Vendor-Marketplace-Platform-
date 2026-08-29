const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
{
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

  items: [orderItemSchema],

  totalAmount: { type: Number, required: true },

  currency: { type: String, default: "usd" },

  status: {
    type: String,
    enum: ["pending", "paid", "failed", "cancelled", "completed"],
    default: "pending"
  },

  paymentIntentId: String

},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);