
const express = require("express");
const { signup, login, logout } = require("../controllers/adminAuth.controller");
const { protect } = require("../middleware/auth.middleware");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/Admin"); // ✅ import Admin model

const router = express.Router();

// --- Validators ---
const adminSignupValidator = [
  body("hospitalName").notEmpty().withMessage("hospitalName is required"),
  body("headName").notEmpty().withMessage("headName is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
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

// --- Public routes ---
router.post("/signup", adminSignupValidator, handleValidation, signup);
router.post("/login", adminLoginValidator, handleValidation, login);

// --- Protected routes ---
router.get("/me", protect("admin"), (req, res) => {
  const { _id, email, headName, hospitalName } = req.user;
  res.json({
    msg: "Authenticated",
    admin: { id: _id, email, headName, hospitalName },
  });
});

router.get("/dashboard", protect("admin"), (req, res) => {
  res.json({ msg: `Welcome Admin: ${req.user.headName}` });
});

// ✅ New Profile route
router.get("/profile", protect("admin"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select(
      "email headName hospitalName"
    );
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", protect("admin"), logout);

module.exports = router;


