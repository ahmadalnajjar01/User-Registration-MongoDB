const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to automatically calculate totalAmount before saving
OrderSchema.pre("save", function (next) {
  this.totalAmount = this.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
