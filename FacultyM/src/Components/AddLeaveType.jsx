import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

const AddLeaveType = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxDays: "",
    requiresAttachment: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:2713/leave-types",
        formData,
        {
          withCredentials:"true",
        }
      );

      if (res.data.success) {
        alert("✅ Leave type added successfully!");
        navigate("/leave-type-list");
      }
    } catch (err) {
      console.error("❌ Error adding leave type:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add leave type. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F9FC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold text-center text-[#001BB7] mb-6">
            Add Leave Type
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Leave Type Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Leave Type Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
                placeholder="Describe the purpose of this leave type"
              />
            </div>

            {/* Max Days */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Max Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="maxDays"
                value={formData.maxDays}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
                required
              />
            </div>

            {/* Requires Attachment */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="requiresAttachment"
                checked={formData.requiresAttachment}
                onChange={handleChange}
                className="h-4 w-4 text-[#001BB7] border-gray-300 rounded"
              />
              <label className="text-sm font-medium">
                Requires Attachment (e.g. medical proof)
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#001BB7] hover:bg-[#FF8040]"
              } text-white px-5 py-2 rounded-md transition font-medium w-full`}
            >
              {loading ? "Saving..." : "Save Leave Type"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveType;
