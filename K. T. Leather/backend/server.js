// ============================================================
// K.T. Leather Store – Backend Server (Modular Structure)
// ============================================================
// Run: node backend/server.js (after npm install)
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const enquiriesRoutes = require("./routes/enquiries");
const billsRoutes = require("./routes/bills");
const productsRoutes = require("./routes/products");
const dashboardRoutes = require("./routes/dashboard");

// Import models
const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ktleather";

// ============================================================
// DATABASE CONNECTION
// ============================================================
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ============================================================
// ROUTES
// ============================================================

// Auth routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, async () => {
  console.log(`🚀 K.T. Leather Store API running on port ${PORT}`);
  
  // Auto-setup admin on first run
  try {
    const exists = await Admin.findOne({ username: "admin" });
    if (!exists) {
      const hashed = await bcrypt.hash("ktls@2025", 10);
      await Admin.create({
        username: "admin",
        email: "dhruvilmakwana16@gmail.com",
        password: hashed
      });
      console.log("✅ Default admin created: admin / ktls@2025");
    }
  } catch (e) {
    console.error("Error creating admin:", e.message);
  }
});

module.exports = app;
