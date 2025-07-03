const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" });
  next();
};

module.exports = { auth, adminAuth };