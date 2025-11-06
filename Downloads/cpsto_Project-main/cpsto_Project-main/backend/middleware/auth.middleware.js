const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = (role) => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ msg: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role) {
        return res.status(403).json({ msg: "Forbidden: wrong role" });
      }

      let currentUser = null;
      if (decoded.role === "user") {
        currentUser = await User.findById(decoded.id);
      } else if (decoded.role === "admin") {
        currentUser = await Admin.findById(decoded.id);
      }

      if (!currentUser) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      // Enforce single-session for both roles (activeSession must match jti)
      if (!decoded.jti || currentUser.activeSession !== decoded.jti) {
        return res.status(401).json({ msg: "Invalid or expired session" });
      }

      req.user = currentUser;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  };
};

module.exports = { protect };
