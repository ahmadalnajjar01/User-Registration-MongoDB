import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import CreateOrder from "./components/CreateOrder"; // Import your CreateOrder component
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
  return (
    <UserProvider>
    <Router>
      <Navbar /> {/* Navbar wird hier eingefÃ¼gt */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
