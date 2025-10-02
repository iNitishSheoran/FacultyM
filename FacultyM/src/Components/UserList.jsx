import React, { useState } from "react";
import { User, Mail, CheckCircle, XCircle, Trash2, KeyRound } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      role: "Admin",
      employeeName: "-",
      email: "-",
      status: "Active",
      lastLogin: "Never",
      createdAt: "2025-03-31",
    },
    {
      id: 2,
      username: "nitish27sheoran",
      role: "Faculty",
      employeeName: "NITISH SHEORAN",
      email: "nitish27sheoran@gmail.com",
      status: "Inactive",
      lastLogin: "Never",
      createdAt: "2025-03-31",
    },
    {
      id: 3,
      username: "rajesh",
      role: "Faculty",
      employeeName: "rajesh",
      email: "rajesh@mail.com",
      status: "Active",
      lastLogin: "Never",
      createdAt: "2025-04-25",
    },
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      <h1 className="text-2xl font-bold text-[#001BB7] mb-6">Users</h1>

      {/* Success Message */}
      <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
        ✅ User status updated successfully.
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#001BB7] text-white text-sm">
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Last Login</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition text-sm"
              >
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "Admin"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">{user.employeeName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">{user.lastLogin}</td>
                <td className="px-4 py-3">{user.createdAt}</td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                    <KeyRound size={16} />
                  </button>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`p-2 rounded ${
                      user.status === "Active"
                        ? "bg-red-200 hover:bg-red-300"
                        : "bg-green-200 hover:bg-green-300"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <XCircle size={16} className="text-red-700" />
                    ) : (
                      <CheckCircle size={16} className="text-green-700" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-red-200 hover:bg-red-300 rounded"
                  >
                    <Trash2 size={16} className="text-red-700" />
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

export default UserList;
