import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";

export const FeaturedProducts = ({ searchQuery }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Products from MongoDB Atlas
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);

        setProducts(res.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return <div className="px-6 mt-8">Loading featured items...</div>;

  return (
    <div className="px-6 mt-8 w-full">
      {/* HEADER */}
      <div className="px-6 flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold">Featured Products</h2>
        <Link to="/shop">
          <button className="text-green-600 text-sm font-medium cursor-pointer hover:underline">
            View All
          </button>
        </Link>
      </div>

      {/* GRID */}
      {filteredProducts.length === 0 ? (
        <p className="px-6 text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id} // ✅ Uses MongoDB _id
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};
