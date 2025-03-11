const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middlewares/authMiddleware"); // Import authentication middleware

// Create Order Route (Requires User Authentication)
router.post("/", protect, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token after authentication
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required." });
    }

    const newOrder = new Order({ user: userId, products });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
