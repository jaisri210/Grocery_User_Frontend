import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Checkout = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(null);
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/settings`);
        setSettings(data);
      } catch {
        toast.error("Failed to load store settings");
      }
    };

    fetchSettings();
  }, [API_URL]);

  if (!settings) return <div className="p-10">Loading...</div>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );

  const shipping =
    subtotal >= settings.freeDeliveryAbove ? 0 : settings.deliveryCharge;

  const taxAmount = (subtotal * settings.tax) / 100;

  const total = subtotal + shipping + taxAmount;

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return toast.error("Your cart is empty");

    if (subtotal < settings.minOrderAmount)
      return toast.error(`Minimum order amount is ₹${settings.minOrderAmount}`);

    if (!address.fullName || !address.address || !address.city)
      return toast.error("Please fill in shipping details");

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          name: item.name || item.productId?.name,
          quantity: item.quantity,
          price: item.price || item.productId?.price,
          image: item.image || item.productId?.image,
        })),
        totalPrice: total,
        shippingAddress: `${address.fullName}, ${address.address}, ${address.city}, ${address.state} - ${address.postalCode}`,
        paymentMethod,
      };
      console.log(orderData);
      const response = await axios.post(`${API_URL}/api/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Order Placed Successfully!");
        await clearCart();
        setTimeout(() => navigate("/success"), 1200);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="text-green-600 hover:underline">
          Home
        </Link>{" "}
        / Checkout
      </nav>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* SHIPPING FORM */}
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["fullName", "address", "city", "postalCode", "state"].map(
                (field) => (
                  <input
                    key={field}
                    name={field}
                    onChange={handleInputChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder={field}
                  />
                ),
              )}
            </div>
          </section>

          {/* PAYMENT METHOD */}
          <section className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Payment Method
            </h2>

            <div
              onClick={() => setPaymentMethod("mock")}
              className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                paymentMethod === "mock"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 font-bold">
                <input
                  type="radio"
                  checked={paymentMethod === "mock"}
                  readOnly
                />
                Mock Secure Payment
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <aside>
          <div className="bg-white border rounded-xl p-6 shadow-md sticky top-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {cartItems.map((item) => (
              <div
                key={item.productId?._id}
                className="flex justify-between text-sm mb-2"
              >
                <span>
                  {item.productId?.name} x{item.quantity}
                </span>
                <span>
                  ₹{((item.productId?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax ({settings.tax}%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-black border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#006837] text-white py-4 mt-8 rounded-xl font-bold text-lg hover:bg-green-800 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
