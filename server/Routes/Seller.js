// routes/sellerRoutes.js
const express = require("express");
const Seller = require("../modules/Seller");
const router = express.Router();

router.post("/request", async (req, res) => {
  const { userId, shopName } = req.body;
  const newSeller = new Seller({ userId, shopName });
  await newSeller.save();
  res.json({ message: "Request sent to admin" });
});

module.exports = router;
