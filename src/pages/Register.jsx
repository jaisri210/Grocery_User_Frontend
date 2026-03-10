import { useState } from "react";
import axios from "axios";
//import { Header } from "../components/Header";
import registerimg from "../assets/login-img.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Register = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Account created successfully!");

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Auth Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          <form onSubmit={handleRegister} className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 text-white py-2 rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5e8741] hover:bg-green-700"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>

          <div className="hidden md:flex items-center justify-center bg-green-50">
            <img
              src={registerimg}
              alt="register illustration"
              className="w-3/4"
            />
          </div>
        </div>
      </div>
    </>
  );
};
