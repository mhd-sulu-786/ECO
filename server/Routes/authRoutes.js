const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const Admin = require("../modules/Admin");
const Seller = require("../modules/Seller");

const router = express.Router();
const JWT_SECRET = "mhdsulu786"; // Change this in production

// 📌 User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user based on role
    let newUser;
    if (role === "seller") {
      newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
      await new Seller({ userId: newUser._id, shopName: `${name}'s Shop` }).save();
    } else {
      newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 User/Admin/Seller Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user/admin exists
    let user = await User.findOne({ email });
    let role = "user";

    if (!user) {
      user = await Admin.findOne({ email });
      if (user) role = "admin";
    }

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
