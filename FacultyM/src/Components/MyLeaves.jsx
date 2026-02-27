import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(
          "https://facultyms-be-3.onrender.com/leaves/my",
          { withCredentials: true }
        );
        setLeaves(res.data?.leaves || []);
      } catch (err) {
        console.error("Error fetching leaves", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const filteredLeaves =
    filter === "all"
      ? leaves
      : leaves.filter((l) => l.status === filter);

  const total = leaves.length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const pending = leaves.filter((l) => l.status === "pending").length;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading your leaves...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white shadow-xl fixed left-0 top-0">
        <SideBar />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64 p-10">

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-3xl shadow-2xl mb-10">
          <h1 className="text-3xl font-bold">Leave Dashboard</h1>
          <p className="opacity-90 text-sm mt-2">
            Track, manage & monitor your leave applications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Leaves" value={total} color="text-indigo-600" />
          <StatCard title="Approved" value={approved} color="text-green-600" />
          <StatCard title="Pending" value={pending} color="text-yellow-600" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {["all", "approved", "pending", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-white shadow text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filteredLeaves.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
            No leave records found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeaves.map((leave) => {
              const totalDays =
                leave.fromDate && leave.toDate
                  ? Math.ceil(
                      (new Date(leave.toDate) -
                        new Date(leave.fromDate)) /
                        (1000 * 60 * 60 * 24)
                    ) + 1
                  : 0;

              return (
                <div
                  key={leave._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {leave.leaveType?.name || "Leave"}
                    </h3>

                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        leave.status
                      )}`}
                    >
                      {leave.status?.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {totalDays} days
                  </p>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Reason</p>
                    <p className="text-sm text-gray-700">
                      {leave.reason || "No reason provided"}
                    </p>
                  </div>

                  {leave.attachmentUrl && (
                    <a
                      href={leave.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-indigo-600 text-sm hover:underline"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className={`text-3xl font-bold mt-2 ${color}`}>
      {value}
    </h2>
  </div>
);

export default MyLeaves;