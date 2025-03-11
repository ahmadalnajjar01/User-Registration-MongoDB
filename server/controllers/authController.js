const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ Generate JWT Token & Store in Cookies
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // ✅ Return token
};

// ✅ Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token = generateToken(res, user._id); // ✅ Store JWT in cookie

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token, // ✅ Return token as well
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(res, user._id); // ✅ Store JWT in cookie

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token, // ✅ Return token as well
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Logout User
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};

// ✅ Get User Profile (Protected Route)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // ✅ Fix: req.user.id (not req.user.userId)
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
