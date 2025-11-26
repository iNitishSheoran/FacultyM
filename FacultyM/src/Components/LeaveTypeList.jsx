import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "./Sidebar";

const LeaveTypeList = () => {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editModal, setEditModal] = useState(null); // store leave object for editing
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    maxDays: "",
    requiresAttachment: false,
  });

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("https://facultyms-be-4.onrender.com/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && data.isAdmin) setIsAdmin(true);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  };

  // Fetch leave types
  const fetchLeaveTypes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://facultyms-be-4.onrender.com/leave-types", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to fetch leave types");
      setLeaveTypes(data.leaveTypes || []);
    } catch (err) {
      console.error("❌ Error fetching leave types:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete leave type
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      const res = await fetch(`https://facultyms-be-4.onrender.com/leave-types/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to delete leave type");
      setLeaveTypes((prev) => prev.filter((l) => l._id !== id));
      setSuccessMessage("Leave type deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting leave type:", err);
      setSuccessMessage(err.message || "Something went wrong while deleting");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  // Open edit modal
  const handleEditClick = (leave) => {
    setEditModal(leave._id);
    setEditData({
      name: leave.name,
      description: leave.description,
      maxDays: leave.maxDays,
      requiresAttachment: leave.requiresAttachment,
    });
  };

  // Save edited leave type
  const handleEditSave = async () => {
    try {
      const res = await fetch(`https://facultyms-be-4.onrender.com/leave-types/${editModal}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to update leave type");

      setLeaveTypes((prev) =>
        prev.map((l) =>
          l._id === editModal ? { ...l, ...editData } : l
        )
      );
      setEditModal(null);
      setSuccessMessage("Leave type updated successfully!");
    } catch (err) {
      console.error("❌ Error updating leave type:", err);
      setSuccessMessage(err.message || "Something went wrong while updating");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchLeaveTypes();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* FIXED SIDEBAR */}
      <div className="w-64 min-w-64 h-screen shadow-lg bg-white flex-shrink-0 sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#001BB7]">Leave Types</h1>
          {isAdmin && (
            <button
              onClick={() => navigate("/add-leave-type")}
              className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040]"
            >
              + Add Leave Type
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading leave types...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : leaveTypes.length === 0 ? (
          <p className="text-center text-gray-600">No leave types found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead className="bg-[#001BB7] text-white">
                <tr>
                  <th className="px-4 py-2">Leave Type</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Max Days</th>
                  <th className="px-4 py-2">Requires Attachment</th>
                  <th className="px-4 py-2">Applications</th>
                  <th className="px-4 py-2">Created At</th>
                  {isAdmin && <th className="px-4 py-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {leaveTypes.map((leave) => (
                  <tr key={leave._id} className="border-b">
                    <td className="px-4 py-2">{leave.name}</td>
                    <td className="px-4 py-2">{leave.description}</td>
                    <td className="px-4 py-2 text-center">{leave.maxDays}</td>
                    <td className="px-4 py-2 text-center">
                      {leave.requiresAttachment ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-gray-400 text-white px-2 py-1 rounded text-sm">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {leave.applications || 0}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(leave.createdAt).toLocaleDateString()}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-2 flex space-x-2 justify-center">
                        <button
                          onClick={() => handleEditClick(leave)}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(leave._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <p className="mb-4 text-lg font-medium">
                Are you sure you want to delete this leave type?
              </p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-semibold text-[#001BB7] mb-4 text-center">
                Edit Leave Type
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 border-gray-300 focus:ring-2 focus:ring-[#001BB7] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 border-gray-300 focus:ring-2 focus:ring-[#001BB7] focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Days
                  </label>
                  <input
                    type="number"
                    value={editData.maxDays}
                    onChange={(e) =>
                      setEditData({ ...editData, maxDays: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 border-gray-300 focus:ring-2 focus:ring-[#001BB7] focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={editData.requiresAttachment}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        requiresAttachment: e.target.checked,
                      })
                    }
                  />
                  <label className="text-sm text-gray-700">
                    Requires Attachment
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-5">
                <button
                  onClick={handleEditSave}
                  className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040]"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditModal(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Popup */}
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

export default LeaveTypeList;
