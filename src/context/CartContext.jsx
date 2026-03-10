import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // 1. Fetch Cart from DB
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // 2. Add / Remove Cart Items
  const addToCart = async (product, quantity = 1) => {
    if (!token) return toast.error("Please login first");
    const pid = product._id || product.id;

    try {
      const res = await axios.post(
        `${API_URL}/api/cart/add`,
        { productId: pid, quantity },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCartItems(res.data.items);

      if (quantity > 0) {
        toast.success(`${product.name} added to cart`);
      } else {
        toast.success(`${product.name} removed from cart`);
      }
    } catch (err) {
      toast.error("Failed to sync cart");
    }
  };

  // 3. Clear Cart
  const clearCart = async () => {
    setCartItems([]);
    try {
      if (token) {
        await axios.delete(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Backend cart clear failed:", err);
    }
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      loading,
      clearCart,
    }),
    [cartItems, loading],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
