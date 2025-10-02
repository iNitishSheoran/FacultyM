import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science and Engineering", code: "CSE", employees: 1, createdAt: "2025-10-03" },
    { id: 4, name: "Electronics and Communication Engineering", code: "ECE", employees: 0, createdAt: "2025-10-03" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAdd = (newDept) => {
    setDepartments([
      ...departments,
      {
        id: departments.length + 1,
        name: newDept.name,
        code: newDept.code,
        employees: 0,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001BB7]">Departments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
        >
          <FaPlus className="mr-2" /> Add Department
        </button>
      </div>

      {/* Department Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#001BB7] text-white text-left">
              <th className="p-3">Department Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Employees</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{dept.name}</td>
                <td className="p-3">{dept.code}</td>
                <td className="p-3">{dept.employees}</td>
                <td className="p-3">{dept.createdAt}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <AddDepartmentModal
          onClose={() => setShowModal(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
};

export default DepartmentList;
