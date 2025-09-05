const jwt = require("jsonwebtoken");

const generateToken = (id, role, jti) => {
  return jwt.sign({ id, role, jti }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "12h",
  });
};

module.exports = { generateToken };
