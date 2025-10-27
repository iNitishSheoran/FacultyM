import React, { useEffect, useState } from "react";
import ictImg from "../assets/Uu.png";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

function Body() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1️⃣ Total Employees
        const facultyRes = await axios.get(
          "http://localhost:2713/faculties",
          { withCredentials: true }
        );
        const totalEmployees = facultyRes.data?.count || 0;

        // 2️⃣ Total Departments
        const deptRes = await axios.get(
          "http://localhost:2713/departments",
          { withCredentials: true }
        );
        const totalDepartments = deptRes.data?.departments?.length || 0;

        // 3️⃣ Total Leave Applications & Pending
        const leavesRes = await axios.get(
          "http://localhost:2713/leaves",
          { withCredentials: true }
        );
        const allLeaves = leavesRes.data?.leaves || [];
        const totalLeaves = allLeaves.length;
        const pendingLeaves = allLeaves.filter(l => l.status === "pending").length;

        setStats({ totalEmployees, totalDepartments, totalLeaves, pendingLeaves });
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Employees", value: stats.totalEmployees, color: "from-[#0046FF] to-[#001BB7]" },
    { title: "Total Departments", value: stats.totalDepartments, color: "from-[#0046FF] to-[#00AEEF]" },
    { title: "Total Leave Applications", value: stats.totalLeaves, color: "from-[#FF8040] to-[#FF4B2B]" },
    { title: "Pending Applications", value: stats.pendingLeaves, color: "from-[#FF8040] to-[#FF2E63]" },
  ];

  return (
    <div className="min-h-screen flex bg-[#E9E9E9] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Banner */}
        <header className="w-full shadow-md">
          <img 
            src={ictImg} 
            alt="SoICT Header"
            className="w-full h-[14rem] object-cover"
          />
        </header>

        {/* Dashboard */}
        <main className="flex-1 p-10">
          <h1 className="text-4xl font-extrabold mb-10 text-[#001BB7] tracking-tight">
            Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition relative overflow-hidden"
              >
                {/* Gradient Top Border */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />
                
                <h2 className="text-sm font-semibold text-gray-600 mb-2">{card.title}</h2>
                <p className="text-3xl font-bold text-[#001BB7]">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <h2 className="text-lg font-bold mb-4 text-[#001BB7]">Leave Type Distribution</h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-sm italic">
                Pie Chart Placeholder
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <h2 className="text-lg font-bold mb-4 text-[#001BB7]">Department Leave Statistics</h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-sm italic">
                Bar Chart Placeholder
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Body;
