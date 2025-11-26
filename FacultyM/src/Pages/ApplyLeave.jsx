import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    attachmentUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingDays, setRemainingDays] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fetch all leave types
  const fetchLeaveTypes = async () => {
    try {
      const res = await fetch("https://facultyms-be-4.onrender.com/leave-types", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch leave types");
      setLeaveTypes(data.leaveTypes || []);
    } catch (err) {
      console.error("❌ Error fetching leave types:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  // ✅ Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If leave type changed → fetch remaining leaves
    if (name === "leaveType" && value) {
      try {
        const res = await fetch(`https://facultyms-be-4.onrender.com/leaves/remaining/${value}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          setRemainingDays(data.remainingDays);
        }
      } catch (err) {
        console.log("Remaining leave error", err);
      }
    }
  };


  // ✅ Submit Leave Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("https://facultyms-be-4.onrender.com/leaves/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Failed to apply for leave");

      setSuccessMessage("Leave applied successfully!");
      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
        attachmentUrl: "",
      });
    } catch (err) {
      console.error("❌ Error applying leave:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F9FC]">
      {/* FIXED SIDEBAR */}
      <div className="w-64 min-w-64 h-screen shadow-lg bg-white flex-shrink-0 sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#001BB7] mb-6">Apply for Leave</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
        >
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
            >
              <option value="">Select leave type</option>
              {leaveTypes.map((lt) => (
                <option key={lt._id} value={lt._id}>
                  {lt.name}
                </option>
              ))}
            </select>
            {formData.leaveType && remainingDays !== null && (
              <p className="text-sm mt-1 text-blue-600 font-medium">
                Remaining leaves available: <span className="font-bold">{remainingDays}</span>
              </p>
            )}
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Enter reason for leave"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
            />
          </div>

          {/* Attachment URL (optional) */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Attachment URL (if required)
            </label>
            <input
              type="text"
              name="attachmentUrl"
              value={formData.attachmentUrl}
              onChange={handleChange}
              placeholder="Enter attachment link (optional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001BB7]"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#001BB7] hover:bg-[#FF8040] text-white px-6 py-2 rounded-md font-medium transition duration-200"
            >
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <p className="mb-4 text-lg font-medium">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage("")}
                className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyLeave;
