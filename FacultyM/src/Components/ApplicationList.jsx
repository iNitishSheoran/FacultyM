import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";

const ApplicationList = () => {
  const [filters, setFilters] = useState({
    status: "",
    department: "",
    fromDate: "",
    toDate: "",
  });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all leave applications (admin only)
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:2713/leaves", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 403 || res.status === 401) {
        throw new Error("Access Denied: Only admin can view this page.");
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch leaves");
      setApplications(data.leaves || []);
    } catch (err) {
      console.error("❌ Error fetching leaves:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Filter handlers
  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleReset = () => setFilters({ status: "", department: "", fromDate: "", toDate: "" });

  // ✅ Approve or Reject Leave
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:2713/leaves/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      fetchApplications();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ Delete Leave
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      const res = await fetch(`http://localhost:2713/leaves/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      fetchApplications();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ Apply filters
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      !filters.status || app.status.toLowerCase() === filters.status.toLowerCase();
    const matchesDept =
      !filters.department ||
      (app.user?.department || "")
        .toLowerCase()
        .includes(filters.department.toLowerCase());
    const matchesFrom =
      !filters.fromDate || new Date(app.fromDate) >= new Date(filters.fromDate);
    const matchesTo = !filters.toDate || new Date(app.toDate) <= new Date(filters.toDate);
    return matchesStatus && matchesDept && matchesFrom && matchesTo;
  });

  // ✅ Styled Access Denied Message
  if (error.toLowerCase().includes("access denied")) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-200 max-w-md">
          <h2 className="text-3xl font-bold text-[#001BB7] mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            Only <span className="font-semibold text-[#FF8040]">Admin</span> users can
            view the Leave Applications.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
            alt="Access Denied"
            className="w-28 mx-auto mb-4 opacity-80"
          />
          <button
            onClick={() => window.history.back()}
            className="bg-[#001BB7] text-white px-5 py-2 rounded-md hover:bg-[#FF8040] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#001BB7] mb-6">Leave Applications</h1>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Department</label>
              <input
                type="text"
                name="department"
                placeholder="e.g. CSE"
                value={filters.department}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex items-end space-x-3">
              <button
                onClick={() => fetchApplications()}
                className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-gray-500 hover:text-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {loading ? (
            <p className="p-6 text-center">Loading applications...</p>
          ) : error ? (
            <p className="p-6 text-center text-red-600">{error}</p>
          ) : filteredApplications.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No applications found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001BB7] text-white">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Leave Type</th>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">To</th>
                  <th className="px-4 py-3">Days</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Applied On</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-100 transition border-b">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{app.user?.fullName}</div>
                      <div className="text-sm text-gray-500">{app.user?.email}</div>
                    </td>
                    <td className="px-4 py-3">{app.user?.department}</td>
                    <td className="px-4 py-3">{app.leaveType?.name}</td>
                    <td className="px-4 py-3">{app.fromDate?.split("T")[0]}</td>
                    <td className="px-4 py-3">{app.toDate?.split("T")[0]}</td>
                    <td className="px-4 py-3">{app.totalDays}</td>
                    <td className="px-4 py-3">{app.reason}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        onClick={() => updateStatus(app._id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
