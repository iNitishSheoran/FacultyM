import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Faculty Added:", formData);
    navigate("/faculty-list");
  };

  return (
    <div className="p-8 bg-[#F4F6FA] min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-[#001BB7] mb-8 tracking-wide">
        ➕ Add New Faculty
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 w-full max-w-3xl border border-gray-200"
      >
        {/* Form in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            >
              <option value="">Select Designation</option>
              <option value="Professor">Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-[#FF8040] hover:to-[#FF4B2B] transition-transform transform hover:-translate-y-0.5"
          >
            ➕ Add Faculty
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaculty;
