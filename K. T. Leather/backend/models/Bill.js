const mongoose = require("mongoose");

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

module.exports = mongoose.model("Bill", BillSchema);
