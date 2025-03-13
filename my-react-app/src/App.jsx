import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Services from "./Services.jsx";
import Contact from "./Contact.jsx";
import LogWorkouts from "./LogWorkouts.jsx";
import LogMeals from "./LogMeals.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import WorkoutDictionary from "./WorkoutDictionary.jsx";
import Streaks from "./Streaks.jsx";

function App() {
  const [user, setUser] = useState(null); // User is null until login

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <MainContent user={user} onLogout={handleLogout} setUser={setUser} />
    </Router>
  );
}

function MainContent({ user, onLogout, setUser }) {
  const location = useLocation(); 

  const hideHeaderRoutes = ["/register", "/login"]; // Pages where header shouldn't show

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header user={user} onLogout={onLogout} />}
      
      <Routes>
        {/* If user is logged in, "/" redirects to Dashboard */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logworkouts" element={<LogWorkouts />} />
        <Route path="/logmeals" element={<LogMeals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/workoutdictionary" element={<WorkoutDictionary />} />
        <Route path="/streaks" element={<Streaks />} />
      </Routes>
      
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
