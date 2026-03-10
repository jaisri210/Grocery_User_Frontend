import logo from "../assets/app_logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  // Check if user is logged in by checking for token
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // 1. Remove the token from storage
    localStorage.removeItem("token");

    // 2. Clear any other user data if stored
    localStorage.removeItem("user");

    // 3. Show feedback
    toast.success("Logged out successfully");

    // 4. Redirect to login or home
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT – LOGO */}
        <div>
          <Link to="/">
            <img
              className="w-16 sm:w-20 md:w-24 cursor-pointer"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>

        {/* CENTER – SEARCH */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-md flex items-center border rounded-full px-4 py-2">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            <input
              type="text"
              placeholder="Search for products..."
              className="ml-3 w-full outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT – ICONS */}
        <div className="flex items-center gap-4 text-[#5e8741]">
          <Link title="Shop" to="/shop">
            <i className="fa-solid fa-store text-xl cursor-pointer hover:opacity-80"></i>
          </Link>

          <Link title="Cart" to="/cart">
            <i className="fa-solid fa-cart-shopping text-xl cursor-pointer hover:opacity-80"></i>
          </Link>

          {/* Conditional Login/Logout */}
          {token ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              <i className="fa-solid fa-right-from-bracket text-xl cursor-pointer"></i>
            </button>
          ) : (
            <Link title="Login" to="/login">
              <i className="fa-solid fa-user text-xl cursor-pointer hover:opacity-80"></i>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
