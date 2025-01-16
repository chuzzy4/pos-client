import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import FormPage from "./pages/FormPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";
import { setSessionExpiredHandler } from "./utils/apiClient";
import { useState } from "react";
import SessionExpiredModal from "./components/SessionExpiredModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./pages/Analytics";
import Inventory from "./pages/Inventory";

const App = () => {
  const location = useLocation(); // Get the current location

  // Routes where the full layout (Sidebar + Header) should NOT appear
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(location.pathname);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Set the session expired handler
  setSessionExpiredHandler(() => {
    setIsSessionExpired(true);
  });

  const handleLoginAgain = () => {
    setIsSessionExpired(false);
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login
  };
  return (
    <div className="flex font-josefin">
      <ToastContainer hideProgressBar={true} />

      {!isAuthRoute && <Sidebar />}
      <div className={`flex-1 ${isAuthRoute ? "" : ""}`}>
        {!isAuthRoute && <Header />}
        <main
          className={`p-4 ${
            isAuthRoute
              ? "min-h-screen flex justify-center items-center bg-gray-100"
              : ""
          }`}
        >
          {isSessionExpired && (
            <SessionExpiredModal
              onLoginAgain={handleLoginAgain}
              onClose={() => setIsSessionExpired(false)}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route path="/form" element={<FormPage />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
