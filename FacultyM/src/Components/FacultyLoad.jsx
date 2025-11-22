import React, { useEffect, useState } from "react";

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
    <div className="p-6 bg-gray-50 min-h-screen">

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
        <table className="w-full border-collapse">
          <thead className="bg-[#001BB7] text-white">
            <tr>
              <th className="py-3 px-2 text-left">Faculty ID</th>
              <th className="py-3 px-2 text-left">Name</th>
              <th className="py-3 px-2 text-left">School</th>
              <th className="py-3 px-2 text-left">Department</th>
              <th className="py-3 px-2 text-left">Total Load</th>
              <th className="py-3 px-2 text-left">Unique Periods</th>
              <th className="py-3 px-2 text-left">Distinct Subjects</th>
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
                    className={`border-b hover:bg-blue-50 transition ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-2">{item.facultyId}</td>
                    <td className="py-3 px-2">{item.name}</td>
                    <td className="py-3 px-2">{item.school}</td>
                    <td className="py-3 px-2">{item.department}</td>
                    <td className="py-3 px-2">{item.totalLoad}</td>
                    <td className="py-3 px-2">{item.uniquePeriods}</td>
                    <td className="py-3 px-2">{item.distinctSubjects}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyLoad;
