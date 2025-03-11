const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.cookies.jwt; // ✅ Get JWT from cookies
  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Store decoded user info
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
