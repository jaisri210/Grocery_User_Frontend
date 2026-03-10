import { useState } from "react";
import axios from "axios";
//import { Header } from "../components/Header";
import loginimg from "../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // 1. Backend State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Submission Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* LEFT FORM */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm mt-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember Me
                </label>
                <span className="text-green-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-6 text-white py-2 rounded-md bg-green-700 hover:bg-green-800 transition-all ${loading ? "opacity-50" : ""}`}
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-green-600 cursor-pointer">Sign Up</span>
              </Link>
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex items-center justify-center bg-green-50">
            <img src={loginimg} alt="login" className="w-3/4" />
          </div>
        </div>
      </div>
    </>
  );
};
