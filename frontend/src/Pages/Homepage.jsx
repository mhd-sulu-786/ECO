import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the E-Commerce Platform</h1>
      <p>Buy & Sell Products Easily</p>
      <div>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/seller"><button>Seller Dashboard</button></Link>
        <Link to="/admin"><button>Admin Dashboard</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
