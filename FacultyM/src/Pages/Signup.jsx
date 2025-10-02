import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/University.png";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md border border-gray-200">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="University Logo" className="h-20 w-20" />
        </div>

        {/* Page Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[#0019A8]">
          Faculty Management System
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Gautam Buddha University
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
            />
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit" 
            className="w-full py-2 rounded-md bg-[#0044FF] text-white font-semibold hover:bg-[#FF7B3D] transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0044FF] font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
