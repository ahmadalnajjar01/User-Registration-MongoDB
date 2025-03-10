const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Store token in HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
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
    generateToken(res, user._id);

    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
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

    generateToken(res, user._id);
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Logout User
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};

// ✅ Get User Profile (Protected Route)
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};
