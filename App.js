import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-white hover:text-gray-300">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/student" className="text-white hover:text-gray-300">
                Student
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route
            path="/"
            element={
              <h1 className="text-3xl font-bold p-4">
                Welcome to Result Management System
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
