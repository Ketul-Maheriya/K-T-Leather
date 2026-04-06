const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products (public - list active products)
router.get("/", async (req, res) => {
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

// POST /api/products (admin only - create product)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return res.status(400).json({ error: "Name and category are required" });
    
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id (admin only)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id (admin only - update product)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true, message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id (admin only - soft delete by deactivating)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true, message: "Product deactivated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
