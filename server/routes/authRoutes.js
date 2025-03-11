const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/user", protect, async (req, res) => {
  try {
    res.json({ userId: req.user.id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
