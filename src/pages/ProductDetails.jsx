import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export const ProductDetails = () => {
  //const API_URL = "http://localhost:3000";
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);

        if (res.data?.category) {
          const relatedRes = await axios.get(
            `${API_URL}/api/products?category=${res.data.category}`,
          );

          const list = Array.isArray(relatedRes.data)
            ? relatedRes.data
            : relatedRes.data.products || [];
          setRelatedProducts(list.filter((p) => p._id !== id));
        }
      } catch (err) {
        console.error("Error fetching product", err);
        toast.error("Could not load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product, qty);
      toast.success(`${qty} ${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart. Please check your login.");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-gray-500">
        Loading product details...
      </div>
    );
  if (!product)
    return (
      <div className="p-20 text-center text-red-500">Product not found.</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-600 transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-green-600 transition">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT: Image Section */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <img
            src={`${API_URL}${product.image}`}
            alt={product.name}
            className="w-full h-[400px] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT: Info Section */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-3xl font-extrabold text-green-700">
            ${product.price?.toFixed(2)}
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Quantity
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="px-5 py-2 bg-gray-50 hover:bg-gray-200 transition text-xl font-bold"
                >
                  −
                </button>
                <span className="px-6 font-bold text-lg min-w-[50px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="px-5 py-2 bg-gray-50 hover:bg-gray-200 transition text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#5e8741] hover:bg-green-800 text-white py-4 rounded-xl w-full md:w-3/4 font-bold text-lg transition-all active:scale-95 shadow-lg shadow-green-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-green-600"></i> Product
          Description
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
          {product.description ||
            "No additional information available for this product."}
        </p>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              You Might Also Like
            </h2>
            <Link
              to="/shop"
              className="text-green-600 font-semibold hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {relatedProducts.slice(0, 4).map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
