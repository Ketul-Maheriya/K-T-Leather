const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authMiddleware");
const Admin = require("../models/Admin");
const PasswordReset = require("../models/PasswordReset");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "ktls_secret_2025";

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });
    
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    
    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/setup (run once to create admin)
router.post("/setup", async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: "admin" });
    if (exists) return res.json({ message: "Admin already exists" });
    
    const hashed = await bcrypt.hash("ktls@2025", 10);
    await Admin.create({
      username: "admin",
      email: "dhruvilmakwana16@gmail.com",
      password: hashed
    });
    res.json({ message: "Admin created: username=admin, email=dhruvilmakwana16@gmail.com, password=ktls@2025" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/change-password (requires authentication)
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: "New password is required" });
    if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(req.admin.id, { password: hashed });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/forgot-password (public - no auth required)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Email not found in system" });
    
    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await PasswordReset.create({ email, token: resetToken, expiresAt });
    
    // In production, send email with reset link. For now, return token (development only)
    res.json({
      message: "Password reset link sent to email. Check your email for the reset token.",
      token: resetToken, // Remove this in production after setting up email service
      resetLink: `http://yourfrontend.com/reset-password?token=${resetToken}`
    });
    console.log(`🔑 Reset token for ${email}: ${resetToken} (expires in 1 hour)`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/reset-password (public - token validated)
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    
    // Find valid reset token
    const resetRecord = await PasswordReset.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() }
    });
    
    if (!resetRecord) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    
    // Find admin by email and update password
    const admin = await Admin.findOne({ email: resetRecord.email });
    if (!admin) return res.status(404).json({ error: "Admin account not found" });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(admin._id, { password: hashed });
    
    // Mark token as used
    await PasswordReset.findByIdAndUpdate(resetRecord._id, { used: true });
    
    res.json({ message: "✅ Password reset successfully. Please login with your new password." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
