const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const adminAuthRoutes = require("./routes/adminAuth.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);

// Health
app.get("/", (req, res) => {
  res.send("Welcome to Home API");
});

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
