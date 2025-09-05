const express = require("express");
const { signup, login, logout } = require("../controllers/adminAuth.controller");
const { protect } = require("../middleware/auth.middleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const adminSignupValidator = [
  body("hospitalName").notEmpty().withMessage("hospitalName is required"),
  body("headName").notEmpty().withMessage("headName is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const adminLoginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

// Public
router.post("/signup", adminSignupValidator, handleValidation, signup);
router.post("/login", adminLoginValidator, handleValidation, login);

// Protected
router.get("/dashboard", protect("admin"), (req, res) => {
  res.json({ msg: `Welcome Admin: ${req.user.headName}` });
});

router.post("/logout", protect("admin"), logout);

module.exports = router;
