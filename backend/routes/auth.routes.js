const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
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

// Public
router.post("/register", registerValidator, handleValidation, register);
router.post("/login", loginValidator, handleValidation, login);

// Protected
router.get("/me", protect("user"), (req, res) => {
  const { _id, name, email, location } = req.user;
  res.json({ msg: "Authenticated", user: { id: _id, name, email, location } });
});

router.get("/dashboard", protect("user"), (req, res) => {
  res.json({ msg: `Welcome User: ${req.user.name}` });
});

router.post("/logout", protect("user"), logout);

module.exports = router;
