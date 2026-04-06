const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

// POST /api/enquiries (public - anyone can submit)
router.post("/", async (req, res) => {
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
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 100 } = req.query;
    const filter = status ? { status } : {};
    
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const total = await Enquiry.countDocuments(filter);
    res.json({
      enquiries,
      total,
      pages: Math.ceil(total / limit),
      page: Number(page)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enquiries/:id (admin only)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id (admin only - update status)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
    res.json({ success: true, message: "Enquiry updated", enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/enquiries/:id (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
