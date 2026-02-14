import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        "https://facultyms-be-4.onrender.com/leaves/my",
        { withCredentials: true }
      );
      setLeaves(res.data?.leaves || []);
    } catch (err) {
      console.error("Error fetching leaves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
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
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading your leaves...
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-8 rounded-3xl shadow-xl mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Leave Dashboard
        </h1>
        <p className="opacity-90">
          Track, manage & monitor your leave applications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Leaves" value={total} />
        <StatCard title="Approved" value={approved} color="text-green-600" />
        <StatCard title="Pending" value={pending} color="text-yellow-600" />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 mb-6">
        {["all", "approved", "pending", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white shadow text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeaves.map((leave) => {
          const totalDays =
            Math.ceil(
              (new Date(leave.toDate) -
                new Date(leave.fromDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1;

          return (
            <div
              key={leave._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  {leave.leaveType?.name}
                </h3>
                <span
                  className={`w-3 h-3 rounded-full ${getStatusStyle(
                    leave.status
                  )}`}
                ></span>
              </div>

              <p className="text-sm text-gray-600">
                {formatDate(leave.fromDate)} →{" "}
                {formatDate(leave.toDate)}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {totalDays} days
              </p>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">
                  Reason
                </p>
                <p className="text-sm text-gray-700">
                  {leave.reason}
                </p>
              </div>

              {leave.attachmentUrl && (
                <a
                  href={leave.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-blue-600 text-sm hover:underline"
                >
                  View Attachment
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = "text-gray-800" }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className={`text-3xl font-bold mt-2 ${color}`}>
      {value}
    </h2>
  </div>
);

export default MyLeaves;
