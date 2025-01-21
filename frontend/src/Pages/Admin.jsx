import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRequests();
    fetchProducts();
    socket.on("receiveMessage", (msg) => setChat((prev) => [...prev, msg]));
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/seller-requests");
    setRequests(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/pending-products");
    setPendingProducts(res.data);
  };

  const approveSeller = (id) => axios.post(`http://localhost:5000/api/admin/approve-seller/${id}`);
  const approveProduct = (id) => axios.post(`http://localhost:5000/api/admin/approve-product/${id}`);

  const sendMessage = () => {
    socket.emit("sendMessage", { sender: "admin", receiver: "seller", message });
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Admin Dashboard</h2>

      <h3>Seller Requests</h3>
      {requests.map((req) => (
        <p key={req._id}>{req.sellerName} <button onClick={() => approveSeller(req._id)}>Approve</button></p>
      ))}

      <h3>Pending Products</h3>
      {pendingProducts.map((product) => (
        <p key={product._id}>{product.name} <button onClick={() => approveProduct(product._id)}>Approve</button></p>
      ))}

      <h3>Chat with Seller</h3>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      {chat.map((msg, index) => (
        <p key={index}>{msg.sender}: {msg.message}</p>
      ))}
    </div>
  );
};

export default AdminDashboard;
