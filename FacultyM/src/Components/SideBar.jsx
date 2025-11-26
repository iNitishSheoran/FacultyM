import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import universityLogo from '../assets/Univ.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <--- detects current route

  const handleLogout = async () => {
    try {
      await axios.post('https://facultyms-be-4.onrender.com/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#FF8040] font-bold"
      : "text-white";

  return (
    <aside className="w-64 h-full bg-[#001BB7] text-white p-6 shadow-xl flex flex-col">

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
      <ul className="space-y-6 text-base font-medium flex-1">

        <li>
          <Link
            to="/dashboard"
            className={`${isActive("/dashboard")} hover:text-[#FF8040] transition`}
          >
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/faculty-list"
            className={`${isActive("/faculty-list")} hover:text-[#FF8040] transition`}
          >
            👥 Faculty List
          </Link>
        </li>

        <li>
          <Link
            to="/application-list"
            className={`${isActive("/application-list")} hover:text-[#FF8040] transition`}
          >
            📄 Application List
          </Link>
        </li>

        <li>
          <Link
            to="/department-list"
            className={`${isActive("/department-list")} hover:text-[#FF8040] transition`}
          >
            🏢 Department List
          </Link>
        </li>

        <li>
          <Link
            to="/leave-type-list"
            className={`${isActive("/leave-type-list")} hover:text-[#FF8040] transition`}
          >
            📅 Leave Type List
          </Link>
        </li>

        <li>
          <Link
            to="/apply-leave"
            className={`${isActive("/apply-leave")} hover:text-[#FF8040] transition`}
          >
            📅 Apply Leave
          </Link>
        </li>

        <li>
          <Link
            to="/faculty-load"
            className={`${isActive("/faculty-load")} hover:text-[#FF8040] transition`}
          >
            📘 Faculty Load Report
          </Link>
        </li>

      </ul>

      {/* Logout */}
      <div className="pt-6 border-t border-white/30">
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
