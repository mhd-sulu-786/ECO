const express = require("express");
const Seller = require("../modules/Seller");
const Product = require("../modules/Data");

const router = express.Router();

// Get all seller requests
router.get("/seller-requests", async (req, res) => {
  const sellers = await Seller.find({ approved: false }).populate("userId", "name email");
  res.json(sellers);
});

// Approve seller request
router.put("/approve-seller/:id", async (req, res) => {
  await Seller.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: "Seller approved successfully!" });
});

// Reject seller request
router.delete("/reject-seller/:id", async (req, res) => {
  await Seller.findByIdAndDelete(req.params.id);
  res.json({ message: "Seller request rejected!" });
});

module.exports = router;
