// ============================================================
// K.T. Leather Store – Backend Server (Node.js + Express + MongoDB)
// ============================================================
// File: server/server.js
// Run: node server.js (after npm install)
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PDFDocument = require("pdfkit");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ktleather";
const JWT_SECRET = process.env.JWT_SECRET || "ktls_secret_2025";

// ============================================================
// DATABASE CONNECTION
// ============================================================
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ============================================================
// MODELS
// ============================================================

// Admin User
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model("Admin", AdminSchema);

// Password Reset Token (for forgot password flow)
const PasswordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

// Enquiry
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  phone: { type: String, required: true },
  email: String,
  interest: String,
  quantity: String,
  type: { type: String, default: "general" },
  message: String,
  fabric: String,
  colors: String,
  branding: String,
  status: { type: String, default: "new" }, // new, contacted, closed
  createdAt: { type: Date, default: Date.now }
});
const Enquiry = mongoose.model("Enquiry", EnquirySchema);

// Bill
const BillItemSchema = new mongoose.Schema({
  product: String,
  qty: Number,
  rate: Number
});
const BillSchema = new mongoose.Schema({
  billNo: { type: String, required: true, unique: true },
  date: String,
  companyName: { type: String, required: true },
  clientAddress: String,
  clientGst: String,
  gstPercent: { type: Number, default: 18 },
  items: [BillItemSchema],
  subtotal: Number,
  gstAmount: Number,
  grandTotal: Number,
  createdAt: { type: Date, default: Date.now }
});
const Bill = mongoose.model("Bill", BillSchema);

// Product
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  icon: String,
  sizes: [String],
  colors: [String],
  qualities: [String],
  features: [String],
  priceMin: Number,
  priceMax: Number,
  priceRange: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model("Product", ProductSchema);

// ============================================================
// MIDDLEWARE
// ============================================================
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ============================================================
// ROUTES – AUTH
// ============================================================

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
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
app.post("/api/auth/setup", async (req, res) => {
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

// POST /api/auth/change-password
app.post("/api/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(req.admin.id, { password: hashed });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/forgot-password – Request password reset
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Email not found" });
    
    // Generate reset token (valid for 1 hour)
    const resetToken = require("crypto").randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await PasswordReset.create({ email, token: resetToken, expiresAt });
    
    // In production, send email with reset link. For now, return token (development only)
    res.json({ 
      message: "Password reset link sent to email. (Development: Check server logs for token)",
      token: resetToken, // Remove this in production
      resetLink: `http://yourfrontend.com/reset-password?token=${resetToken}`
    });
    console.log(`🔑 Reset token for ${email}: ${resetToken}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/reset-password – Reset password with token
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
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
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(admin._id, { password: hashed });
    
    // Mark token as used
    await PasswordReset.findByIdAndUpdate(resetRecord._id, { used: true });
    
    res.json({ message: "Password reset successfully. Please login with your new password." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ============================================================
// ROUTES – ENQUIRIES
// ============================================================

// POST /api/enquiries (public – anyone can submit)
app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!phone || phone.trim().length === 0) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return res.status(400).json({ error: "Please enter a valid phone number (minimum 10 digits)" });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }
    
    // Create enquiry
    const enquiry = await Enquiry.create({
      name: name.trim(),
      company: req.body.company?.trim() || undefined,
      phone: phone.trim(),
      email: email?.trim() || undefined,
      interest: req.body.interest?.trim() || undefined,
      quantity: req.body.quantity?.trim() || undefined,
      type: req.body.type || "general",
      message: req.body.message?.trim() || undefined,
      fabric: req.body.fabric?.trim() || undefined,
      colors: req.body.colors?.trim() || undefined,
      branding: req.body.branding?.trim() || undefined
    });
    
    res.status(201).json({ 
      success: true, 
      id: enquiry._id,
      message: "✅ Enquiry received successfully! We will contact you within 24 hours."
    });
  } catch (err) {
    console.error("Enquiry creation error:", err);
    res.status(500).json({ error: "Failed to submit enquiry. Please try again." });
  }
});

// GET /api/enquiries (admin only)
app.get("/api/enquiries", authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 100 } = req.query;
    const filter = status ? { status } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Enquiry.countDocuments(filter);
    res.json({ enquiries, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id (update status)
app.patch("/api/enquiries/:id", authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ROUTES – BILLS
// ============================================================

// POST /api/bills
app.post("/api/bills", authMiddleware, async (req, res) => {
  try {
    const { items, gstPercent, ...rest } = req.body;
    const subtotal = items.reduce((s, i) => s + (i.qty * i.rate), 0);
    const gstAmount = Math.round(subtotal * gstPercent / 100);
    const grandTotal = subtotal + gstAmount;
    const bill = await Bill.create({ ...rest, items, gstPercent, subtotal, gstAmount, grandTotal });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills
app.get("/api/bills", authMiddleware, async (req, res) => {
  try {
    const { company, from, to, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (company) filter.companyName = { $regex: company, $options: "i" };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    const bills = await Bill.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Bill.countDocuments(filter);
    res.json({ bills, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/:id
app.get("/api/bills/:id", authMiddleware, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/:id/pdf – Generate PDF
app.get("/api/bills/:id/pdf", authMiddleware, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Bill-${bill.billNo}.pdf`);
    doc.pipe(res);

    // Header
    doc.fontSize(20).font("Helvetica-Bold").text("K.T. LEATHER STORE", { align: "center" });
    doc.fontSize(9).font("Helvetica").text("09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004", { align: "center" });
    doc.text(`GST: 24AOXPM5482M1Z0 | Tel: 9825562702 / 8200647440 | Email: ktls_yogesh@hotmail.com`, { align: "center" });
    doc.moveDown().moveTo(50, doc.y).lineTo(545, doc.y).stroke("#5c2d09").moveDown(0.5);

    // Bill meta
    doc.fontSize(11).font("Helvetica-Bold").text(`Bill No: ${bill.billNo}`, 50, doc.y, { continued: true });
    doc.font("Helvetica").text(`   Date: ${bill.date}`, { align: "right" });
    doc.moveDown(0.3);

    // Client
    doc.fontSize(11).font("Helvetica-Bold").text("Billed To:");
    doc.fontSize(11).font("Helvetica").text(bill.companyName);
    if (bill.clientAddress) doc.text(bill.clientAddress);
    if (bill.clientGst) doc.text(`GST: ${bill.clientGst}`);
    doc.moveDown();

    // Table header
    const tableTop = doc.y;
    const col = [50, 260, 340, 420, 500];
    doc.rect(50, tableTop - 5, 495, 22).fill("#5c2d09");
    doc.fillColor("#ffffff").fontSize(10).font("Helvetica-Bold");
    doc.text("Product", col[0], tableTop, { width: 200 });
    doc.text("Qty", col[1], tableTop, { width: 70, align: "right" });
    doc.text("Rate", col[2], tableTop, { width: 70, align: "right" });
    doc.text("Amount", col[3], tableTop, { width: 80, align: "right" });
    doc.fillColor("#000000");

    let y = tableTop + 22;
    bill.items.forEach((item, i) => {
      const bg = i % 2 === 0 ? "#fdf6ee" : "#ffffff";
      doc.rect(50, y - 3, 495, 20).fill(bg);
      doc.fillColor("#222").fontSize(10).font("Helvetica");
      doc.text(item.product, col[0], y, { width: 200 });
      doc.text(String(item.qty), col[1], y, { width: 70, align: "right" });
      doc.text(`Rs.${item.rate.toLocaleString("en-IN")}`, col[2], y, { width: 70, align: "right" });
      doc.text(`Rs.${(item.qty * item.rate).toLocaleString("en-IN")}`, col[3], y, { width: 80, align: "right" });
      y += 22;
    });

    doc.moveTo(50, y).lineTo(545, y).stroke("#ccc");
    y += 10;
    doc.fontSize(11).font("Helvetica").text("Subtotal:", 360, y).text(`Rs.${bill.subtotal.toLocaleString("en-IN")}`, 450, y, { align: "right" });
    y += 18;
    doc.text(`GST (${bill.gstPercent}%):`, 360, y).text(`Rs.${bill.gstAmount.toLocaleString("en-IN")}`, 450, y, { align: "right" });
    y += 18;
    doc.font("Helvetica-Bold").text("Grand Total:", 360, y).text(`Rs.${bill.grandTotal.toLocaleString("en-IN")}`, 450, y, { align: "right" });

    y += 50;
    doc.moveTo(350, y).lineTo(545, y).stroke("#222");
    doc.fontSize(10).font("Helvetica").text("Authorized Signatory", 350, y + 5, { width: 195, align: "center" });
    doc.text("K.T. Leather Store", 350, y + 18, { width: 195, align: "center" });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/next-number – Get next bill number
app.get("/api/bills/next-number", authMiddleware, async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const count = await Bill.countDocuments({ billNo: { $regex: `KT/${year}/` } });
    const nextNum = String(count + 1).padStart(3, "0");
    res.json({ billNo: `KT/${year}/${nextNum}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ROUTES – PRODUCTS
// ============================================================

// GET /api/products (public)
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { active: true };
    if (category && category !== "all") filter.category = category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products (admin)
app.post("/api/products", authMiddleware, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id (admin)
app.put("/api/products/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id (admin – soft delete)
app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: "Product deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ROUTES – DASHBOARD STATS
// ============================================================
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: "new" });
    const totalBills = await Bill.countDocuments();
    const totalRevenue = await Bill.aggregate([{ $group: { _id: null, total: { $sum: "$grandTotal" } } }]);
    const totalProducts = await Product.countDocuments({ active: true });
    res.json({
      totalEnquiries, newEnquiries, totalBills,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  } catch (e) {}
});

module.exports = app;
