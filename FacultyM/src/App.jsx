import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import FacultyList from "./Components/FacultyList";
import AddFaculty from "./Components/AddFaculty";


function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route index element={<Login />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faculty-list" element={<FacultyList />} />
        <Route path="/add-faculty" element={<AddFaculty />} />

      </Routes>
    </Router>
  );
}

export default App;
