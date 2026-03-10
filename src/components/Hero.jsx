import { Link } from "react-router-dom";
import heroimg from "../assets/hero-img.png";

export const Hero = () => {
  return (
    <div className="font-serif w-full bg-gradient-to-r from-[#5e8741] to-[#abd074] px-4 py-6 md:px-6 md:py-10">
      {/* MOBILE IMAGE */}
      <div className="flex justify-center md:hidden mb-4">
        <img className="w-3/4" src={heroimg} alt="hero" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-12 lg:pl-20">
          <h1 className="text-2xl md:text-4xl text-white font-bold leading-snug">
            Fresh Vegetables & Fruits <br />
            right from Farmers
          </h1>

          <p className="mt-2 text-white font-semibold tracking-wide">
            Harvest Door — From Farm to Your Front Door
          </p>

          <p className="mt-2 text-white/90 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Bringing farm-fresh, handpicked produce straight to your doorstep —
            healthy, affordable, and delivered with care every day.
          </p>

          <Link to="/shop">
            <button className="mt-4 px-6 py-3 bg-[#59ae3c] text-white rounded-full w-full md:w-auto cursor-pointer hover:bg-[#4a9a33] transition">
              Shop Now
            </button>
          </Link>
        </div>

        {/* DESKTOP IMAGE */}
        <div className="hidden md:flex w-1/2 justify-end md:pr-12 lg:pr-20">
          <img className="w-3/4" src={heroimg} alt="hero" />
        </div>
      </div>
    </div>
  );
};
