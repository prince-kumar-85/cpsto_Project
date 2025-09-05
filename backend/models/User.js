const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activeSession: { type: String, default: null } // jti for single-session
  },
  { timestamps: true }
);

module.exports = mongoose.model("Uwser", userSchema); // ✅ fix typo "Usser" -> "User"
