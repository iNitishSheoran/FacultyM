import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal";
import Sidebar from "./SideBar";
import axios from "axios";

// EditDepartmentModal component
const EditDepartmentModal = ({ dept, onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: dept.name, code: dept.code });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...dept, ...formData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Department</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Department Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Department Code"
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#001BB7] text-white hover:bg-[#FF8040]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editDept, setEditDept] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletedDeptName, setDeletedDeptName] = useState("");

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

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("https://facultyms-be-4.onrender.com/departments", { withCredentials: true });
      setDepartments(res.data.departments);
    } catch (err) {
      console.error("❌ Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchDepartments();
  }, []);

  const handleAdd = async (newDept) => {
    if (!isAdmin) return;
    try {
      const res = await axios.post(
        "https://facultyms-be-4.onrender.com/departments",
        { name: newDept.name, code: newDept.code },
        { withCredentials: true }
      );
      setDepartments([...departments, { ...res.data.department, employees: 0 }]);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Add department error:", err);
    }
  };

  const handleEditSave = async (updatedDept) => {
    try {
      const res = await axios.put(
        `https://facultyms-be-4.onrender.com/departments/${updatedDept._id}`,
        { name: updatedDept.name, code: updatedDept.code },
        { withCredentials: true }
      );
      setDepartments(
        departments.map((dept) => (dept._id === updatedDept._id ? res.data.department : dept))
      );
      setEditDept(null);
    } catch (err) {
      console.error("❌ Update department error:", err);
    }
  };

  const handleDelete = async (id, name) => {
    if (!isAdmin) return;
    try {
      await axios.delete(`https://facultyms-be-4.onrender.com/departments/${id}`, { withCredentials: true });
      setDepartments(departments.filter((dept) => dept._id !== id));
      setDeletedDeptName(name);
      setShowDeletePopup(true);
    } catch (err) {
      console.error("❌ Delete department error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* FIXED SIDEBAR */}
      <div className="w-64 min-w-64 h-screen shadow-lg bg-white flex-shrink-0 sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#001BB7]">Departments</h1>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
            >
              <FaPlus className="mr-2" /> Add Department
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#001BB7] text-white text-left">
                <th className="p-3">Department Name</th>
                <th className="p-3">Code</th>
                <th className="p-3">Employees</th>
                <th className="p-3">Created At</th>
                {isAdmin && <th className="p-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{dept.name}</td>
                  <td className="p-3">{dept.code}</td>
                  <td className="p-3">{dept.employees}</td>
                  <td className="p-3">{new Date(dept.createdAt).toLocaleDateString()}</td>
                  {isAdmin && (
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => setEditDept(dept)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(dept._id, dept.name)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-800"
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

        {/* Add Department Modal */}
        {showModal && (
          <AddDepartmentModal onClose={() => setShowModal(false)} onSave={handleAdd} />
        )}

        {/* Edit Department Modal */}
        {editDept && (
          <EditDepartmentModal
            dept={editDept}
            onClose={() => setEditDept(null)}
            onSave={handleEditSave}
          />
        )}

        {/* Delete confirmation popup */}
        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-xl font-bold mb-4">Department Deleted</h2>
              <p className="mb-6">{deletedDeptName} has been successfully deleted.</p>
              <button
                className="bg-[#001BB7] text-white px-4 py-2 rounded hover:bg-[#FF8040] transition"
                onClick={() => setShowDeletePopup(false)}
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

export default DepartmentList;
