import { useState } from "react";
import axios from "axios";

function SellerDashboard() {
  const [shopName, setShopName] = useState("");

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/seller/request", {
      userId: "123456", // Dummy userId
      shopName,
    });
    alert(response.data.message);
  };

  return (
    <div>
      <h2>Seller Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Shop Name"
        onChange={(e) => setShopName(e.target.value)}
      />
      <button onClick={sendRequest}>Request Approval</button>
    </div>
  );
}

export default SellerDashboard;
