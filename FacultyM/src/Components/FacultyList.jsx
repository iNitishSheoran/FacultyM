import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

const FacultyList = () => {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch current user to check admin status
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:2713/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.success && data.isAdmin) setIsAdmin(true);
      console.log(isAdmin);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  };

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:2713/faculties", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to fetch faculty list");
      setFacultyData(data.faculties || []);
    } catch (err) {
      console.error("❌ Error fetching faculties:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:2713/faculty/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to delete faculty");

      setFacultyData((prev) => prev.filter((f) => f._id !== id));
      setSuccessMessage("Faculty deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting faculty:", err);
      setSuccessMessage(err.message || "Something went wrong while deleting faculty");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchFaculties();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#F7F9FC]">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#001BB7]">Faculty List</h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading faculties...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : facultyData.length === 0 ? (
          <p className="text-center text-gray-600">No faculties found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#001BB7] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left">Photo</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Subjects</th>
                  <th className="px-4 py-2 text-left">Age</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  {isAdmin && <th className="px-4 py-2 text-center">Actions</th>}
                </tr>
              </thead>

              <tbody>
                {facultyData.map((f) => (
                  <tr key={f._id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="px-4 py-2">
                      {f.photoUrl ? (
                        <img src={f.photoUrl} alt={f.fullName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      )}
                    </td>
                    <td className="px-4 py-2">{f.fullName}</td>
                    <td className="px-4 py-2">{f.email}</td>
                    <td className="px-4 py-2">{f.phoneNo || "-"}</td>
                    <td className="px-4 py-2 uppercase">{f.department}</td>
                    <td className="px-4 py-2">{Array.isArray(f.subjects) ? f.subjects.join(", ") : "-"}</td>
                    <td className="px-4 py-2">{f.age || "-"}</td>
                    <td className="px-4 py-2 capitalize">{f.gender || "-"}</td>
                    {isAdmin && (
                      <td className="px-4 py-2 flex justify-center gap-3">
                        <button
                          onClick={() => setConfirmDeleteId(f._id)}
                          className="text-red-600 hover:scale-110 transition"
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

        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <p className="mb-4 text-lg font-medium">Are you sure you want to delete this faculty?</p>
              <div className="flex justify-around mt-4">
                <button onClick={() => handleDelete(confirmDeleteId)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                  Delete
                </button>
                <button onClick={() => setConfirmDeleteId(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <p className="mb-4 text-lg font-medium">{successMessage}</p>
              <button onClick={() => setSuccessMessage("")} className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition">
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyList;
