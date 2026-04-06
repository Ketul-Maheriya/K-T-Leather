const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Enquiry = require("../models/Enquiry");
const Bill = require("../models/Bill");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/dashboard (admin only - get stats)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: "new" });
    const contactedEnquiries = await Enquiry.countDocuments({ status: "contacted" });
    const closedEnquiries = await Enquiry.countDocuments({ status: "closed" });
    
    const totalBills = await Bill.countDocuments();
    const totalRevenue = await Bill.aggregate([
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]);
    
    const totalProducts = await Product.countDocuments({ active: true });
    const inactiveProducts = await Product.countDocuments({ active: false });
    
    res.json({
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      closedEnquiries,
      totalBills,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts,
      inactiveProducts,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
