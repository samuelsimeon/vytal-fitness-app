import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import "./DashboardCalendar.css";

// Icons 
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/dictionary.png";
import logWorkoutIcon from "/icons/gym.png";
import logMealIcon from "/icons/meal.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/logout.png";
import notificationIcon from "/icons/bell.png";
import userIcon from "/icons/logout.png";

// Sample logged workout data
const sampleWorkouts = {
  "2025-03-07": [
    { name: "Push Up", duration: "5 min", sets: "3 x 10", weight: "90 kg" },
    { name: "Push Up", duration: "5 min", sets: "3 x 10", weight: "20 lb" },
    { name: "Push Up", duration: "5 min", sets: "3 x 10", weight: "90 kg" },
  ],
};

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = selectedDate.toISOString().split("T")[0]; 

  return (
    <div className="dashboard">
      {/* Left Sidebar Navigation */}
      <aside className="sidebar">
        <Link to="/dashboard" className="sidebar-icon"><img src={dashboardIcon} alt="Dashboard" /></Link>
        <Link to="/workoutdictionary" className="sidebar-icon"><img src={dictionaryIcon} alt="Workout Dictionary" /></Link>
        <Link to="/logworkouts" className="sidebar-icon"><img src={logWorkoutIcon} alt="Log Workout" /></Link>
        <Link to="/logmeals" className="sidebar-icon"><img src={logMealIcon} alt="Log Meal" /></Link>
        <Link to="/settings" className="sidebar-icon"><img src={settingsIcon} alt="Settings" /></Link>
        <Link to="/profile" className="sidebar-icon"><img src={profileIcon} alt="Profile" /></Link>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="date-display">📅 {selectedDate.toDateString()}</div>
          <div className="user-info">
            <img src={notificationIcon} alt="Notifications" className="icon" />
            <div className="user-profile">
              <img src={userIcon} alt="User" className="profile-pic" />
              <div>
                <p className="username">Username</p>
                <span className="member-since">Member since 2021</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="dashboard-title">Dashboard</h2>

        {/* Dashboard Widgets */}
        <div className="dashboard-widgets">
          <div className="widget-row">
            <div className="widget">
              <h3>Macros Unit</h3>
              {/* <p>Calorie: 500 of 3000</p>
              <p>Protein: 50 of 200</p>
              <p>Goal: 20.83%</p> */}
              <img className="widgetimg" src="/icons/pie-chart.png" alt="analytics" />
            </div>
            <div className="widget">
              <h3>Analytics Report</h3>
              <img className="widgetimg" src="/icons/analytics.png" alt="analytics" />
            </div>

          </div>
          <div className="widget-row">
            <div className="widget">
              <h3>Notes & Reminders</h3>
              <img className="widgetimg" src="/icons/sticky-notes.png" alt="analytics" />
            </div>
            <div className="widget">
              <h3>Achievements & Streaks</h3>
              <img className="widgetimg" src="/icons/fire2.png" alt="analytics" />
            </div>
          </div>

          {/* Workout Logging Section */}
          <div className="logged-workouts">
            <h3>Logged Workouts</h3>
            <p>{dateKey in sampleWorkouts ? dateKey : "No Workouts Logged"}</p>

            {dateKey in sampleWorkouts ? (
              <table>
                <thead>
                  <tr>
                    <th className="tablehead">Name</th>
                    <th className="tablehead">Duration</th>
                    <th className="tablehead">Set x Rep</th>
                    <th className="tablehead">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleWorkouts[dateKey].map((workout, index) => (
                    <tr key={index}>
                      <td>{workout.name}</td>
                      <td>{workout.duration}</td>
                      <td>{workout.sets}</td>
                      <td>{workout.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No workouts logged on this date.</p>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar - Calendar & Testimonials */}
      <aside className="right-sidebar">
        {/* Workout Calendar */}
        <div className="workout-calendar">
          <h3>Workout Calendar</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <div className="testimonial-placeholder">Testimonial</div>
          <div className="testimonial-placeholder">To be determined</div>
          <div className="testimonial-placeholder">To be determined</div>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
