require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/DB");

// Import Routes
const authRoutes = require("./Routes/authRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const sellerRoutes = require("./Routes/Seller");
const adminRoutes = require("./Routes/Admin");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

// 📌 SOCKET.IO CHAT FUNCTIONALITY
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Listen for messages
  socket.on("sendMessage", async ({ sender, senderType, receiver, receiverType, message }) => {
    try {
      const Chat = require("./modules/Chat");
      const chatMessage = new Chat({ sender, senderType, receiver, receiverType, message });
      await chatMessage.save();

      io.emit("receiveMessage", chatMessage); // Send to all clients
    } catch (error) {
      console.error("❌ Chat Error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
