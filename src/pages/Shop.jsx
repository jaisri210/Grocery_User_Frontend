import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import axios from "axios";

export const Shop = ({ searchQuery = "" }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(50);
  const [sortBy, setSortBy] = useState("popularity");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory,
    )
    .filter((p) => p.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      return (b.popularity || 0) - (a.popularity || 0);
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59ae3c]"></div>
        <p className="mt-4 text-gray-500">Loading fresh groceries...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 px-4 md:px-6 py-6">
      {/* SIDEBAR */}
      <aside className="w-64 hidden md:block flex-shrink-0">
        <h3 className="font-semibold mb-3 text-gray-700">Categories</h3>
        {["All", "Vegetables", "Fruits", "Dairy", "Beverages"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`block w-full text-left px-3 py-2 rounded mb-1 transition ${
              selectedCategory === cat
                ? "bg-[#59ae3c] text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}

        <h3 className="font-semibold mt-6 mb-2 text-gray-700">Price</h3>
        <input
          type="range"
          min="1"
          max="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-[#59ae3c] cursor-pointer"
        />
        <p className="text-sm mt-1 font-medium text-gray-600">
          Up to ${priceRange}
        </p>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Shop</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#59ae3c] bg-white text-sm"
          >
            <option value="popularity">Popularity</option>
            <option value="price">Price: Low to High</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-gray-500">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange(100);
              }}
              className="mt-4 text-[#59ae3c] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
