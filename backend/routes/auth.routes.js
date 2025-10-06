const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { registerValidator, loginValidator } = require("../utils/validators");
const { validationResult } = require("express-validator");

const router = express.Router();

// Validation handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

// ------------------ Public Routes ------------------
router.post("/register", registerValidator, handleValidation, register);
router.post("/login", loginValidator, handleValidation, login);

// ------------------ Protected Routes ------------------
router.post("/logout", protect("user"), logout);
router.get("/profile", protect("user"), getProfile);

module.exports = router;
