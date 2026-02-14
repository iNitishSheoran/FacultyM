import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/leaves/my", {
        withCredentials: true,
      });

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

  const getStatusColor = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700";
    if (status === "Rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading your leaves...
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Leave Requests</h2>

{leaves?.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          You haven't applied for any leaves yet.
        </div>
      ) : (
        <div className="grid gap-5">
          {leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white shadow-md rounded-2xl p-5 border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  {leave.leaveType?.name}
                </h3>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                    leave.status
                  )}`}
                >
                  {leave.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Reason:</span> {leave.reason}
                </p>

                {leave.attachment && (
                  <p className="text-blue-600 font-medium">
                    📎 Attachment Uploaded
                  </p>
                )}
              </div>

              {leave.adminRemark && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="font-medium">Admin Remark:</span>{" "}
                  {leave.adminRemark}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLeaves;
