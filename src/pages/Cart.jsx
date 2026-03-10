import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  //const API_URL = "http://localhost:3000";
  const API_URL = import.meta.env.VITE_API_URL;
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  const validCartItems = cartItems.filter((item) => item.productId);

  const subtotal = validCartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );

  const shipping = validCartItems.length > 0 ? 2.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {" "}
      <p className="text-sm text-gray-500 mb-4">
        {" "}
        <Link to="/" className="text-green-600 hover:underline">
          Home{" "}
        </Link>{" "}
        / Shopping Cart{" "}
      </p>
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {validCartItems.length === 0 ? (
            <p className="text-gray-500 py-10">Your cart is empty</p>
          ) : (
            validCartItems.map((item) => (
              <div
                key={item._id || item.productId?._id}
                className="flex flex-wrap md:flex-nowrap items-center justify-between border rounded-lg p-4 bg-white shadow-sm gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                  <img
                    src={`${API_URL}${item.productId?.image}`}
                    alt={item.productId?.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="font-medium truncate">
                      {item.productId?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${item.productId?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-none pt-3 md:pt-0">
                  <div className="flex items-center border rounded overflow-hidden bg-gray-50">
                    <button
                      onClick={() => addToCart(item.productId, -1)}
                      className="px-3 py-1 hover:bg-gray-200 transition-colors"
                    >
                      −
                    </button>

                    <span className="px-4 font-medium min-w-[40px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addToCart(item.productId, 1)}
                      className="px-3 py-1 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-lg text-gray-800 w-24 text-right">
                    ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}

          <Link
            to="/shop"
            className="inline-block mt-4 text-green-600 text-sm font-medium hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="border rounded-lg p-6 h-fit bg-gray-50 sticky top-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between font-bold text-xl pt-1">
              <span>Total</span>
              <span className="text-green-700">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => validCartItems.length > 0 && navigate("/checkout")}
            disabled={validCartItems.length === 0}
            className="w-full mt-6 bg-[#5e8741] text-white py-3 rounded-lg font-bold hover:bg-green-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
