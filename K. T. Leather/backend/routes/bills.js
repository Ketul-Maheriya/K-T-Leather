const express = require("express");
const PDFDocument = require("pdfkit");
const authMiddleware = require("../middleware/authMiddleware");
const Bill = require("../models/Bill");

const router = express.Router();

// POST /api/bills (admin only - create invoice)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, gstPercent, companyName, billNo } = req.body;
    if (!companyName) return res.status(400).json({ error: "Company name is required" });
    if (!items || items.length === 0) return res.status(400).json({ error: "At least one item is required" });
    
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const gstAmount = Math.round(subtotal * gstPercent / 100);
    const grandTotal = subtotal + gstAmount;
    
    const bill = await Bill.create({
      ...req.body,
      subtotal,
      gstAmount,
      grandTotal
    });
    
    res.status(201).json({ success: true, message: "Bill created successfully", bill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills (admin only - list all bills)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { company, from, to, page = 1, limit = 100 } = req.query;
    const filter = {};
    
    if (company) filter.companyName = { $regex: company, $options: "i" };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    
    const bills = await Bill.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const total = await Bill.countDocuments(filter);
    res.json({
      bills,
      total,
      pages: Math.ceil(total / limit),
      page: Number(page)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/:id (admin only - get single bill)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/next-number (admin only - get next bill number)
router.get("/next-bill/number", authMiddleware, async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const count = await Bill.countDocuments({ billNo: { $regex: `KT/${year}/` } });
    const nextNum = String(count + 1).padStart(3, "0");
    res.json({ billNo: `KT/${year}/${nextNum}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/:id/pdf (admin only - generate PDF)
router.get("/:id/pdf", authMiddleware, async (req, res) => {
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

module.exports = router;
