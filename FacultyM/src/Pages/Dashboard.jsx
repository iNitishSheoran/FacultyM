import React, { useEffect, useState } from "react";
import ictImg from "../assets/Uu.png";
import bannerImg from "../assets/Banner.png";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import Chatbot from "../Components/Chatbot";
import toast from "react-hot-toast";

function Body() {
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
        // Fetch logged-in user
        const userRes = await axios.get("https://facultyms-be-4.onrender.com/user", {
          withCredentials: true,
        });

        const isAdmin = userRes.data?.isAdmin;

        //Fetch stats common for all users (Employees + Departments)
        const facultyRes = await axios.get("https://facultyms-be-4.onrender.com/faculties", {
          withCredentials: true,
        });

        const deptRes = await axios.get("https://facultyms-be-4.onrender.com/departments", {
          withCredentials: true,
        });

        const totalEmployees = facultyRes.data?.count || 0;
        const totalDepartments = deptRes.data?.departments?.length || 0;

        // If admin → show global leaves
        if (isAdmin) {
          const leavesRes = await axios.get("https://facultyms-be-4.onrender.com/leaves", {
            withCredentials: true,
          });

          const allLeaves = leavesRes.data?.leaves || [];

          setStats({
            totalEmployees,
            totalDepartments,
            totalLeaves: allLeaves.length,
            pendingLeaves: allLeaves.filter((l) => l.status === "pending").length,
          });

          return;
        }

        // If faculty → show only HIS leave counts
        const myCountsRes = await axios.get(
          "https://facultyms-be-4.onrender.com/leaves/my/counts",
          { withCredentials: true }
        );

        const my = myCountsRes.data.counts;

        setStats({
          totalEmployees,
          totalDepartments,
          totalLeaves: my.total || 0,
          pendingLeaves: my.pending || 0,
        });

      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);



  // Notification Popup
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const res = await axios.get(
          "https://facultyms-be-4.onrender.com/leaves/notifications/pending",
          { withCredentials: true }
        );

        const notifications = res.data.notifications || [];

        if (notifications.length === 0) return;

        for (const leave of notifications) {
          toast.success(`Your leave has been ${leave.status}!`, {
            duration: 5000,
          });

          await axios.put(
            `https://facultyms-be-4.onrender.com/leaves/${leave._id}/mark-notified`,
            {},
            { withCredentials: true }
          );
        }
      } catch (err) {
        console.error("❌ Notification check error:", err);
      }
    };

    checkNotifications();
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      gradient: "from-blue-600 to-blue-800",
      icon: "👨‍💼",
    },
    {
      title: "Total Departments",
      value: stats.totalDepartments,
      gradient: "from-blue-600 to-cyan-500",
      icon: "🏢",
    },
    {
      title: "Total Leave Applications",
      value: stats.totalLeaves,
      gradient: "from-orange-400 to-red-500",
      icon: "📝",
    },
    {
      title: "Pending Applications",
      value: stats.pendingLeaves,
      gradient: "from-orange-500 to-pink-600",
      icon: "⏳",
    },
  ];

  const notices = [
    {
      title: "Faculty Meeting Scheduled",
      description:
        "All faculty members are requested to attend the meeting tomorrow at 10:00 AM in the main auditorium.",
      date: "24 Nov 2025",
    },
    {
      title: "Time Table Update",
      description:
        "Updated timetable has been released for all departments. Students are advised to check the academic portal.",
      date: "22 Nov 2025",
    },
    {
      title: "Feedback Form",
      description:
        "Kindly complete the monthly feedback form. Your response is important for quality improvement.",
      date: "20 Nov 2025",
      link: "https://forms.google.com",
    },
    {
      title: "Holiday Announcement",
      description:
        "Campus will remain closed on Friday due to maintenance activities. Classes will resume normally from Saturday.",
      date: "18 Nov 2025",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F4F8] font-sans overflow-x-hidden">
      <div className="w-64 min-w-64 h-screen shadow-lg bg-white fixed left-0 top-0 overflow-y-auto">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        {showBanner && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
            <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-4xl w-[90%] border border-gray-200 animate-scaleIn">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md transition"
              >
                ✖
              </button>

              <img
                src={bannerImg}
                alt="Popup Banner"
                className="rounded-2xl max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}

        <header className="w-full shadow-md">
          <img
            src={ictImg}
            alt="SoICT Header"
            className="w-full h-[15rem] object-cover rounded-b-3xl shadow-lg animate-slideDown"
          />
        </header>

        <main className="flex-1 p-10">
          <h1 className="text-5xl font-extrabold mb-12 text-[#0A1D56] tracking-tight animate-fadeIn">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {cards.map((card, i) => (
              <div
                key={i}
                className="relative bg-white rounded-3xl shadow-lg p-7 border border-gray-100 hover:shadow-3xl hover:-translate-y-2 transition-all transform overflow-hidden animate-fadeInUp"
              >
                <div
                  className={`absolute inset-0 opacity-20 bg-gradient-to-br ${card.gradient}`}
                />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h2 className="text-md font-semibold text-gray-600 mb-1">
                    {card.title}
                  </h2>
                  <p className="text-5xl font-extrabold text-[#0A1D56]">
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 NEW PROFESSIONAL NOTICE BOARD */}
          <div className="mt-14">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-[#0A1D56] flex items-center gap-3">
                📌 Notice Board
              </h2>

              <div className="space-y-6">
                {notices.map((n, i) => (
                  <div
                    key={i}
                    className="
                      group
                      relative
                      bg-[#FAFAFA]
                      border border-gray-200
                      rounded-xl
                      p-6
                      shadow-sm
                      hover:shadow-md
                      transition-all
                      overflow-hidden
                    "
                  >
                    {/* Left color bar on hover */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all"></div>

                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition">
                        {n.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {n.date}
                      </span>
                    </div>

                    <p className="text-gray-700 mt-2 leading-relaxed">
                      {n.description}
                    </p>

                    {n.link && (
                      <a
                        href={n.link}
                        target="_blank"
                        className="text-blue-700 font-medium mt-2 inline-block group-hover:underline"
                      >
                        👉 Open Form
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Chatbot />
        <Footer />
      </div>
    </div>
  );
}

export default Body;
