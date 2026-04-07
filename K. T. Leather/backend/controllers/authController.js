const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Admin = require("../models/Admin");
const PasswordReset = require("../models/PasswordReset");

const JWT_SECRET = process.env.JWT_SECRET || "ktls_secret_2025";

exports.login = async (req, res) => {
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
};

exports.setup = async (req, res) => {
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
};

exports.changePassword = async (req, res) => {
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
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Email not found in system" });
    
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await PasswordReset.create({ email, token: resetToken, expiresAt });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Password Reset - K.T. Leather Store',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your admin account at K.T. Leather Store.</p>
          <p>Click the link below to set a new password:</p>
          <a href="${resetLink}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#1e3a8a; text-decoration:none; border-radius:5px; margin: 10px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: "Password reset link sent successfully. Please check your email inbox."
    });
    console.log(`🔑 Password reset email dispatched to ${email}`);
  } catch (err) {
    console.error("Error sending email: ", err);
    res.status(500).json({ error: "Failed to send reset email. Please try again later." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    
    const resetRecord = await PasswordReset.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() }
    });
    
    if (!resetRecord) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    
    const admin = await Admin.findOne({ email: resetRecord.email });
    if (!admin) return res.status(404).json({ error: "Admin account not found" });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(admin._id, { password: hashed });
    
    await PasswordReset.findByIdAndUpdate(resetRecord._id, { used: true });
    
    res.json({ message: "✅ Password reset successfully. Please login with your new password." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
