const express = require("express");
const Chat = require("../modules/Chat");
const authMiddleware = require("../Middilewear/authMiddleware");

const router = express.Router();

// Fetch chat messages between a seller and admin
router.get("/:sellerId", authMiddleware, async (req, res) => {
  try {
    const { sellerId } = req.params;

    // Ensure only admin or the specific seller can access
    if (req.user.role !== "admin" && req.user.id !== sellerId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: sellerId },
        { sender: sellerId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
