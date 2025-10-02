import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/University.png";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    age: "",
    gender: "female",
    department: "cse",
    subjects: [],
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectsChange = (e) => {
    const value = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, subjects: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:2713/signup",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex justify-center mb-1">
          <img src={logo} alt="University Logo" className="h-20 w-20" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
          Create Account
        </h2>
        <h1 className="text-2xl font-bold text-center text-[#0019A8] mb-1">
          Faculty Management System
        </h1>
        <p className="text-center text-sm text-gray-600 mb-5">
          Gautam Buddha University
        </p>

        {/* ✅ Fixed Form (no scroll inside card) */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Row 1: Full Name + Email */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center border rounded-md px-3 border-gray-300 bg-gray-50">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full py-2 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
                required
              />
            </div>
          </div>

          {/* Row 2: Phone + Age */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: Number(e.target.value) }))
                }
                placeholder="Enter age"
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
                required
              />

            </div>
          </div>

          {/* Row 3: Gender + Department */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
              >
                <option value="cse">CSE</option>
                <option value="it">IT</option>
                <option value="ece">ECE</option>
              </select>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects (comma separated)
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects.join(", ")}
              onChange={handleSubjectsChange}
              placeholder="e.g. Mathematics, Physics"
              className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0044FF]"
              required
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

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#0044FF] text-white font-semibold hover:bg-[#FF7B3D] transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
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
