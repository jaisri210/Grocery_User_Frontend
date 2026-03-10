import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  //const API_URL = "http://localhost:3000";
  const API_URL = import.meta.env.VITE_API_URL;

  const { addToCart } = useCart();

  const handleAddClick = async (e) => {
    e.preventDefault();

    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };
  const navigate = useNavigate();
  const handleBuyNow = async () => {
    if (!product) return;
    try {
      await addToCart(product, 1);

      navigate("/checkout");
    } catch (err) {
      console.error("FULL ERROR OBJECT:", err); // 👈 This tells you the truth
      toast.error(
        err.response?.data?.message || "Process failed. Check console.",
      );
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-[220px] transition-transform hover:scale-105">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${API_URL}${product.image}`}
          alt={product.name}
          className="w-full h-32 object-contain"
        />
        <h3 className="mt-2 font-medium truncate">{product.name}</h3>
        <p className="font-semibold text-green-700">${product.price}</p>
      </Link>

      <button
        onClick={handleAddClick}
        className="mt-2 w-full bg-[#5e8741] text-white py-2 rounded cursor-pointer hover:bg-green-800 transition-colors"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="mt-2 w-full bg-[#5e8741] text-white py-2 rounded cursor-pointer hover:bg-green-800 transition-colors"
      >
        <i className="fa-solid fa-bolt"></i> Buy Now
      </button>
    </div>
  );
};
