import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import FacultyList from "./Components/FacultyList";
import AddFaculty from "./Components/AddFaculty";
import ApplicationList from "./Components/ApplicationList";
import DepartmentList from "./Components/DepartmentList";
import AddDepartmentModal from "./Components/AddDepartmentModal";
import LeaveTypeList from "./Components/LeaveTypeList";
import AddLeaveType from "./Components/AddLeaveType";
import ApplyLeave from "./Pages/ApplyLeave";


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
        <Route path="/application-list" element={<ApplicationList />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path="/add-department-list" element={<AddDepartmentModal />} />
        <Route path="/leave-type-list" element={<LeaveTypeList />} />
        <Route path="/add-leave-type" element={<AddLeaveType />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
      </Routes>
    </Router>
  );
}

export default App;
