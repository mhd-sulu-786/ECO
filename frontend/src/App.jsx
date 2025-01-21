import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/Admin";
import RegisterPage from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/reg" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
