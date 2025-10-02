import React, { useState } from "react";

const AddDepartmentModal = ({ onClose, onSave }) => {
  const [newDept, setNewDept] = useState({ name: "", code: "" });

  const handleSubmit = () => {
    if (newDept.name && newDept.code) {
      onSave(newDept);
      setNewDept({ name: "", code: "" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Add Department</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Department Name</label>
            <input
              type="text"
              value={newDept.name}
              onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Department Code</label>
            <input
              type="text"
              value={newDept.code}
              onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#001BB7] text-white px-4 py-2 rounded-md hover:bg-[#FF8040] transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
