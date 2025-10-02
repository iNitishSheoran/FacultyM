import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/University.png";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter username"
                className="w-full py-2 bg-transparent focus:outline-none"
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
                type="password"
                placeholder="Enter password"
                className="w-full py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <select className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#0044FF] focus:outline-none">
              <option value="">Select Role</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit" 
            className="w-full py-2 rounded-md bg-[#0044FF] text-white font-semibold hover:bg-[#FF7B3D] transition-all cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-[#0044FF]">Forgot Password?</a>
          <Link to="/signup" className="hover:text-[#FF7B3D]">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
