import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import universityLogo from '../assets/Univ.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:2713/logout', {}, { withCredentials: true });
      navigate('/login'); // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <aside className="w-64 bg-[#001BB7] text-white p-6 shadow-xl flex flex-col">
      {/* University Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={universityLogo}
          alt="University Logo"
          className="w-64 h-28 object-contain mb-0"
        />
         <h2
      className="text-2xl font-extrabold text-center text-[#FF8040] tracking-wide cursor-pointer hover:text-orange-400"
      onClick={() => navigate("/dashboard")}
    >
      Admin Panel
        </h2>
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-6 text-base font-medium">
        <li className="hover:text-[#FF8040] transition cursor-pointer">
           <Link to="/dashboard">📊 Dashboard </Link>
          </li>
        <li className="hover:text-[#FF8040] transition cursor-pointer">
          <Link to="/faculty-list">👥 Faculty List</Link>
        </li>
        <li className="hover:text-[#FF8040] transition cursor-pointer">
          <Link to="/application-list">📄 Application List</Link>
        </li>
        <li className="hover:text-[#FF8040] transition cursor-pointer">
          <Link to="/department-list">🏢 Department List</Link>
        </li>
        <li className="hover:text-[#FF8040] transition cursor-pointer">
          <Link to="/leave-type-list">📅 Leave Type List</Link>
        </li>
        <li className="hover:text-[#FF8040] transition cursor-pointer">
          <Link to="/apply-leave">📅 Apply Leave</Link>
        </li>
      </ul>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/30">
        <li
          onClick={handleLogout}
          className="hover:text-red-400 cursor-pointer transition"
        >
          ➡ Logout
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
