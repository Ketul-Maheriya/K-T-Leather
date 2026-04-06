const mongoose = require("mongoose");

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

module.exports = mongoose.model("Product", ProductSchema);
