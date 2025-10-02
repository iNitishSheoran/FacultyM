import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const FacultyList = () => {
  const navigate = useNavigate();

  // Dummy data (isko backend se laaoge baad me)
  const facultyData = [
    {
      id: 1,
      name: "NITISH SHEORAN",
      email: "nitish27sheoran@gmail.com",
      phone: "7988100765",
      department: "Computer Science and Engineering",
      designation: "Professor",
      joiningDate: "2004-07-27",
    },
  ];

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001BB7]">Faculty List</h1>
        <button
          onClick={() => navigate("/add-faculty")}
          className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
        >
          + Add New Faculty
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#001BB7] text-white text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Joining Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyData.map((f) => (
              <tr key={f.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{f.name}</td>
                <td className="px-4 py-2">{f.email}</td>
                <td className="px-4 py-2">{f.phone}</td>
                <td className="px-4 py-2">{f.department}</td>
                <td className="px-4 py-2">{f.designation}</td>
                <td className="px-4 py-2">{f.joiningDate}</td>
                <td className="px-4 py-2 flex justify-center gap-3">
                  {/* <button className="text-blue-600 hover:scale-110 transition">
                    <FaEye />
                  </button> */}
                  {/* <button className="text-green-600 hover:scale-110 transition">
                    <FaEdit />
                  </button> */}
                  <button className="text-red-600 hover:scale-110 transition">
                    <FaTrash />
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

export default FacultyList;
