import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/University.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // faculty or admin
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://facultyms-be-4.onrender.com/login",
        { email: formData.email, password: formData.password, role: formData.role }, // ✅ include role
        { withCredentials: true }
      );


      if (!res.data.success) throw new Error("Login failed");

      // Admin check
      if (formData.role === "admin" && res.data.user.email !== "ict2025gbu@gmail.com") {
        setError("You are not authorized as admin");
        return;
      }

      navigate("/dashboard"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="University Logo" className="h-16" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[#0019A8]">
          Faculty Management System
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Gautam Buddha University
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Id
            </label>
            <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email id"
                className="w-full py-2 bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full py-2 bg-transparent focus:outline-none"
                required
              />
              <span
                className="ml-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Login As */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#0044FF] focus:outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#0044FF] text-white font-semibold hover:bg-[#FF7B3D] transition-all cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-[#0044FF]">Forgot Password?</a>
          <Link to="/signup" className="hover:text-[#FF7B3D]">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
