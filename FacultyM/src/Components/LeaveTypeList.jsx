import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeaveTypeList = () => {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([
    {
      id: 1,
      name: "Casual Leave (CL)",
      description: "For short-term personal work or emergencies",
      maxDays: 12,
      requiresAttachment: false,
      createdAt: "2025-03-31",
      applications: 1,
    },
    {
      id: 2,
      name: "Earned Leave (EL)",
      description: "Accumulates with service, used for vacations or long rest",
      maxDays: 30,
      requiresAttachment: false,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 3,
      name: "Sick Leave (SL)",
      description: "For illness or medical reasons",
      maxDays: 15,
      requiresAttachment: true,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 4,
      name: "Maternity Leave",
      description: "For female faculty during childbirth",
      maxDays: 180,
      requiresAttachment: true,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 5,
      name: "Paternity Leave",
      description: "For male faculty during childbirth",
      maxDays: 15,
      requiresAttachment: false,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 6,
      name: "Study Leave / Academic Leave",
      description: "For higher studies, research or attending conferences",
      maxDays: 24,
      requiresAttachment: true,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 7,
      name: "Sabbatical Leave",
      description: "Long-term leave (6 months to 1 year) for research/training",
      maxDays: 365,
      requiresAttachment: true,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 8,
      name: "On Duty (OD) Leave",
      description: "For official academic work (seminars, exam duty, workshops)",
      maxDays: 10,
      requiresAttachment: false,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 9,
      name: "Half-Pay Leave (HPL)",
      description: "Granted on half salary, often for medical purposes",
      maxDays: 20,
      requiresAttachment: true,
      createdAt: "2025-03-31",
      applications: 0,
    },
    {
      id: 10,
      name: "Leave Without Pay (LWP)",
      description: "When no leave balance, salary deducted for the period",
      maxDays: 90,
      requiresAttachment: false,
      createdAt: "2025-03-31",
      applications: 0,
    },
  ]);

  const handleDelete = (id) => {
    setLeaveTypes(leaveTypes.filter((leave) => leave.id !== id));
  };

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001BB7]">Leave Types</h1>
        <button
          onClick={() => navigate("/add-leave-type")}
          className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040]"
        >
          + Add Leave Type
        </button>
      </div>

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
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.map((leave) => (
              <tr key={leave.id} className="border-b">
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
                <td className="px-4 py-2 text-center">{leave.applications}</td>
                <td className="px-4 py-2 text-center">{leave.createdAt}</td>
                <td className="px-4 py-2 flex space-x-2 justify-center">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded">
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(leave.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    🗑️
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

export default LeaveTypeList;
