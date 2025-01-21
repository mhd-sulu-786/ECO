const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shopName: String,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Seller", SellerSchema);
