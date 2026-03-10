import { Link } from "react-router-dom";

export const OffersBanner = () => {
  return (
    <div className="px-6 mt-8 mb-8">
      <div className="bg-gradient-to-r from-[#4a9a33] to-[#8bcf6b] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between">
        {/* TEXT */}
        <div className="text-white text-center p-4 md:text-left">
          <h3 className="text-lg md:text-2xl font-bold">Special Offer!</h3>
          <p className="mt-1 text-sm md:text-base">
            Up to <span className="font-semibold">50% OFF</span> on selected
            fresh products
          </p>
        </div>

        {/* BUTTON */}
        <Link to="/shop">
          <button className="px-8 mt-4 md:mt-0 bg-white text-green-700 font-semibold px-6 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
            Shop Offers
          </button>
        </Link>
      </div>
    </div>
  );
};
