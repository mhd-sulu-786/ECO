const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
