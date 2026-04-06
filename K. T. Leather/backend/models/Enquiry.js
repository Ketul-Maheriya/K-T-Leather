const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  phone: { type: String, required: true },
  email: String,
  interest: String,
  quantity: String,
  type: { type: String, default: "general" }, // general, uniform, safety, leather, gifts
  message: String,
  fabric: String,
  colors: String,
  branding: String,
  status: { type: String, default: "new" }, // new, contacted, closed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
