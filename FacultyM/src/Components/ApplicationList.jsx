import React, { useState } from "react";

const ApplicationList = () => {
  const [filters, setFilters] = useState({
    status: "",
    department: "",
    fromDate: "",
    toDate: "",
  });

  const [applications, setApplications] = useState([
    {
      id: 1,
      employee: "NITISH SHEORAN",
      email: "nitish27sheoran@gmail.com",
      department: "Computer Science and Engineering",
      leaveType: "Casual Leave",
      fromDate: "2025-04-26",
      toDate: "2025-04-28",
      days: 3,
      reason: "Personal",
      status: "Approved",
      appliedOn: "2025-04-24 19:48",
    },
  ]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({ status: "", department: "", fromDate: "", toDate: "" });
  };

  return (
    <div className="p-8 bg-[#F7F9FC] min-h-screen">
      <h1 className="text-3xl font-bold text-[#001BB7] mb-6">
        Leave Applications
      </h1>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">All Departments</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex items-end space-x-3">
            <button className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition">
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
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#001BB7] text-white">
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">From Date</th>
              <th className="px-4 py-3">To Date</th>
              <th className="px-4 py-3">Days</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied On</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-gray-100 transition border-b"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold">{app.employee}</div>
                  <div className="text-sm text-gray-500">{app.email}</div>
                </td>
                <td className="px-4 py-3">{app.department}</td>
                <td className="px-4 py-3">{app.leaveType}</td>
                <td className="px-4 py-3">{app.fromDate}</td>
                <td className="px-4 py-3">{app.toDate}</td>
                <td className="px-4 py-3">{app.days}</td>
                <td className="px-4 py-3">{app.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3">{app.appliedOn}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
