const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  name: String,
  price: Number,
  description: String,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", ProductSchema);
