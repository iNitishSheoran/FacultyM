import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    age: "",
    department: "",
    password: "",
    gender: "not specified",
    subjects: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:2713/faculty/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password, // ✅ include password
          department: formData.department,
          gender: formData.gender || "not specified",
          subjects: formData.subjects
            ? formData.subjects.split(",").map((s) => s.trim())
            : [],
          phoneNo: formData.phoneNo || "",
          age: formData.age ? Number(formData.age) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add faculty");
      }

      setSuccessMessage("Faculty added successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNo: "",
        age: "",
        department: "",
        password: "",
        gender: "not specified",
        subjects: "",
      });
    } catch (err) {
      console.error("❌ Error adding faculty:", err);
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
            />
          </div>

          {/* Department */}
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

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
            >
              <option value="not specified">Not Specified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Subjects (comma separated)
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#001BB7] px-4 py-2 rounded-lg shadow-sm"
              placeholder="e.g., Math, Physics"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-[#FF8040] hover:to-[#FF4B2B] transition-transform transform hover:-translate-y-0.5"
          >
            {loading ? "Adding..." : "➕ Add Faculty"}
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <p className="mb-4 text-lg font-medium">{successMessage}</p>
            <button
              onClick={() => {
                setSuccessMessage("");
                navigate("/faculty-list");
              }}
              className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <p className="mb-4 text-lg font-medium text-red-600">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFaculty;
