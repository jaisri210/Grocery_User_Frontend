import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Components & Pages
import { Header } from "../components/Header.jsx";
import { Home } from "../pages/Home.jsx";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { Shop } from "../pages/Shop.jsx";
import { Cart } from "../pages/Cart.jsx";
import { Checkout } from "../pages/Checkout.jsx";
import { Success } from "../pages/Success.jsx";

import { ProductDetails } from "../pages/ProductDetails.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const hasAccess = token && token !== "undefined";

  return hasAccess ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken !== token) {
      setToken(currentToken);
    }
  }, []);

  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home searchQuery={searchQuery} />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Public Shop Routes */}
        <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Checkout Route */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Order Success Route */}
        <Route path="/success" element={<Success />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
