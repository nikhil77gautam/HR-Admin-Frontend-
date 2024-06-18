import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Component/Auth/Signup";
import Signin from "./Component/Auth/Signin";

import HRDashboard from "./Dashboard/HR-Dashboard";
import AdminDashboard from "./Dashboard/Admin-Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
