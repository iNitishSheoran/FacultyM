import React from 'react';
import ictImg from '../assets/Uu.png';       // Banner wali image
import universityLogo from '../assets/Univ.png'; // University logo ka path

function Body() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E9E9E9] font-sans">
      {/* Header Banner */}
      <header className="w-full shadow-md">
        <img 
          src={ictImg} 
          alt="SoICT Header"
          className="w-full h-56.2 object-cover"
        />
      </header>

      {/* Layout */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#001BB7] text-white p-6 shadow-xl flex flex-col">
          {/* University Logo */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src={universityLogo} 
              alt="University Logo" 
              className="w-64 h-28 object-contain mb-0"
            />
            <h2 className="text-2xl font-extrabold text-center text-[#FF8040] tracking-wide">
              Admin Panel
            </h2>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-6 text-base font-medium">
            <li className="hover:text-[#FF8040] transition cursor-pointer">📊 Dashboard</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">👥 Employees List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">📄 Application List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">🏢 Department List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">📌 Designation List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">📅 Leave Type List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">👤 User List</li>
            <li className="hover:text-[#FF8040] transition cursor-pointer">📑 Reports</li>
          </ul>

          <div className="mt-auto pt-6 border-t border-white/30">
            <li className="hover:text-red-400 cursor-pointer transition">➡ Logout</li>
          </div>
        </aside>

        {/* Dashboard */}
        <section className="flex-1 p-10">
          <h1 className="text-4xl font-extrabold mb-10 text-[#001BB7] tracking-tight">
            Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Total Employees", value: "1", color: "from-[#0046FF] to-[#001BB7]" },
              { title: "Total Departments", value: "5", color: "from-[#0046FF] to-[#00AEEF]" },
              { title: "Total Leave Applications", value: "1", color: "from-[#FF8040] to-[#FF4B2B]" },
              { title: "Pending Applications", value: "0", color: "from-[#FF8040] to-[#FF2E63]" },
            ].map((card, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition relative overflow-hidden`}
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
        </section>
      </main>
    </div>
  );
}

export default Body;
