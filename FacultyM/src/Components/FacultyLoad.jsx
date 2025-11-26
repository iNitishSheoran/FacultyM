import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";

function FacultyLoad() {
  const [school, setSchool] = useState("SOICT");
  const [dept, setDept] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLoad = async () => {
    try {
      setLoading(true);

      const url = `https://mygbu.in/schd/load.php?school=${school}&dept=${dept}`;
      const res = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      );

      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const rows = [...doc.querySelectorAll("table tr")].slice(1);

      const parsed = rows.map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          facultyId: cells[0]?.innerText.trim(),
          name: cells[1]?.innerText.trim(),
          school: cells[2]?.innerText.trim(),
          department: cells[3]?.innerText.trim(),
          totalLoad: cells[4]?.innerText.trim(),
          uniquePeriods: cells[5]?.innerText.trim(),
          distinctSubjects: cells[6]?.innerText.trim(),
        };
      });

      setData(parsed);
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoad();
  }, [school, dept]);

  // SHIMMER ROW COMPONENT
  const ShimmerRow = () => (
    <tr className="animate-pulse">
      {Array(7)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="py-3 px-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
        ))}
    </tr>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* FIXED SIDEBAR */}
      <div className="w-64 min-w-64 h-screen shadow-lg bg-white flex-shrink-0 sticky top-0">
        <SideBar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto min-w-0">

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-[#001BB7] mb-6">
          Faculty Load Report
        </h1>

        {/* FILTERS */}
        <div className="flex gap-4 mb-6">
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow bg-white outline-[#001BB7]"
          >
            <option value="SOICT">SOICT</option>
          </select>

          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow bg-white outline-[#001BB7]"
          >
            <option value="">All</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <table className="w-full table-fixed border-collapse">

            <thead className="bg-[#001BB7] text-white">
              <tr>
                <th className="py-3 px-4 text-left w-28">Faculty ID</th>
                <th className="py-3 px-4 text-left w-64">Name</th> {/* MORE SPACE */}
                <th className="py-3 px-4 text-left w-28">School</th>
                <th className="py-3 px-4 text-left w-36">Department</th>
                <th className="py-3 px-4 text-left w-28">Total Load</th>
                <th className="py-3 px-4 text-left w-40">Unique Periods</th>
                <th className="py-3 px-4 text-left w-32">Distinct Subjects</th> {/* LESS SPACE */}
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array(10)
                  .fill(0)
                  .map((_, i) => <ShimmerRow key={i} />)
                : data.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-b hover:bg-blue-50 transition ${i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <td className="py-3 px-4 truncate">{item.facultyId}</td>
                    <td className="py-3 px-4 truncate">{item.name}</td>
                    <td className="py-3 px-4 truncate">{item.school}</td>
                    <td className="py-3 px-4 truncate">{item.department}</td>
                    <td className="py-3 px-4 truncate">{item.totalLoad}</td>
                    <td className="py-3 px-4 truncate">{item.uniquePeriods}</td>
                    <td className="py-3 px-4 truncate">{item.distinctSubjects}</td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );


}

export default FacultyLoad;
