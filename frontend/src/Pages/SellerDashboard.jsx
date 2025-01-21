import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetchProducts();
    socket.on("receiveMessage", (msg) => setChat((prev) => [...prev, msg]));
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/seller/products");
    setProducts(res.data);
  };

  const sendMessage = () => {
    socket.emit("sendMessage", { sender: "seller", receiver: "admin", message });
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Seller Dashboard</h2>

      <h3>Request Approval</h3>
      <button onClick={() => axios.post("http://localhost:5000/api/seller/request")}>Request Admin Approval</button>

      <h3>Add Product</h3>
      <button onClick={() => axios.post("http://localhost:5000/api/seller/addProduct", { name: "New Product" })}>Add Product</button>

      <h3>Your Products</h3>
      {products.map((product) => (
        <p key={product._id}>{product.name} - {product.status}</p>
      ))}

      <h3>Chat with Admin</h3>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      {chat.map((msg, index) => (
        <p key={index}>{msg.sender}: {msg.message}</p>
      ))}
    </div>
  );
};

export default SellerDashboard;
