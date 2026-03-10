import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5e8741] to-[#abd074] text-white mt-12 font-bold">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <h3 className="text-lg font-bold mb-2">Harvest Door</h3>
            <p className="text-sm text-white/80">
              From farm to your front door. Fresh, healthy groceries delivered
              with care.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link className="hover:text-white transition" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="opacity-60 cursor-not-allowed">My Orders</li>
              <li className="opacity-60 cursor-not-allowed">Wishlist</li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Vegetables</li>
              <li>Fruits</li>
              <li>Dairy</li>
              <li>Flour & Lentils</li>
            </ul>
          </div>

          {/* CONTACT / INFO */}
          <div>
            <h4 className="font-semibold mb-3">Info</h4>
            <p className="text-sm text-white/80">
              📍 Serving local communities <br />
              🕒 7 AM – 10 PM <br />
              🚚 Same-day delivery
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/20 my-6"></div>

        {/* BOTTOM */}
        <div className="text-center text-sm text-white/70">
          © {new Date().getFullYear()} Harvest Door. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
