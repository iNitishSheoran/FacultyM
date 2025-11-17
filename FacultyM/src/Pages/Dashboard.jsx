import React, { useEffect, useState } from "react";
import ictImg from "../assets/Uu.png";
import bannerImg from "../assets/Banner.png"; // Banner Popup Image
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

function Body() {
  // Banner Popup Control
  const [showBanner, setShowBanner] = useState(true);

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
  });

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total Employees
        const facultyRes = await axios.get("http://localhost:2713/faculties", {
          withCredentials: true,
        });
        const totalEmployees = facultyRes.data?.count || 0;

        // Total Departments
        const deptRes = await axios.get("http://localhost:2713/departments", {
          withCredentials: true,
        });
        const totalDepartments = deptRes.data?.departments?.length || 0;

        // Leaves Data
        const leavesRes = await axios.get("http://localhost:2713/leaves", {
          withCredentials: true,
        });
        const allLeaves = leavesRes.data?.leaves || [];
        const totalLeaves = allLeaves.length;
        const pendingLeaves = allLeaves.filter(
          (l) => l.status === "pending"
        ).length;

        setStats({
          totalEmployees,
          totalDepartments,
          totalLeaves,
          pendingLeaves,
        });
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  // Dashboard Cards
  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      color: "from-[#0046FF] to-[#001BB7]",
    },
    {
      title: "Total Departments",
      value: stats.totalDepartments,
      color: "from-[#0046FF] to-[#00AEEF]",
    },
    {
      title: "Total Leave Applications",
      value: stats.totalLeaves,
      color: "from-[#FF8040] to-[#FF4B2B]",
    },
    {
      title: "Pending Applications",
      value: stats.pendingLeaves,
      color: "from-[#FF8040] to-[#FF2E63]",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#E9E9E9] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 POPUP BANNER */}
        {showBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl shadow-2xl p-3 max-w-4xl w-[90%]">
              {/* Close Button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-lg"
              >
                ✖
              </button>

              {/* Banner Image */}
              <img
                src={bannerImg}
                alt="Popup Banner"
                className="rounded-lg max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}

        {/* Header Image */}
        <header className="w-full shadow-md">
          <img
            src={ictImg}
            alt="SoICT Header"
            className="w-full h-[14rem] object-cover"
          />
        </header>

        {/* Dashboard Content */}
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
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
                />
                <h2 className="text-sm font-semibold text-gray-600 mb-2">
                  {card.title}
                </h2>
                <p className="text-3xl font-bold text-[#001BB7]">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <h2 className="text-lg font-bold mb-4 text-[#001BB7]">
                Leave Type Distribution
              </h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-sm italic">
                Pie Chart Placeholder
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <h2 className="text-lg font-bold mb-4 text-[#001BB7]">
                Department Leave Statistics
              </h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-sm italic">
                Bar Chart Placeholder
              </div>
            </div>
          </div>
        </main>

        {/* ✅ Footer at Bottom */}
        <Footer />
      </div>
    </div>
  );
}

export default Body;
