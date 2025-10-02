import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeaveType = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxDays: "",
    requiresAttachment: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Leave Type Added:", formData);
    navigate("/leave-type-list");
  };

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      <h1 className="text-2xl font-bold text-[#001BB7] mb-6">Add Leave Type</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium">Leave Type Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Max Days</label>
          <input
            type="number"
            name="maxDays"
            value={formData.maxDays}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="requiresAttachment"
            checked={formData.requiresAttachment}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium">Requires Attachment</label>
        </div>

        <button
          type="submit"
          className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
        >
          Save Leave Type
        </button>
      </form>
    </div>
  );
};

export default AddLeaveType;
