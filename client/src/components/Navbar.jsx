import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleLogout = async () => {
    try {
      // Send POST request to the backend to logout the user (optional backend action)
      await axiosInstance.post("/logout"); // Make sure to create this route in your backend
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Error during logout: " + err.response?.data);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-white hover:underline">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link to="/profile" className="text-white hover:underline">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/CreateOrder" className="text-white hover:underline">
            Create Order
          </Link>
        </li>

        {/* Logout button - visible after the user is logged in */}
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;