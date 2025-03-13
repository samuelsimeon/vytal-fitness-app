// src/LogWorkouts.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LogWorkouts.css";

function LogWorkouts() {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [workoutLog, setWorkoutLog] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch all logs on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:3009/api/logs", {
          credentials: "include", // Ensure the session cookie is sent
        });
        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }
        const logsArray = await res.json(); // logs is an array from the server

        // Group logs by date to match your local state structure
        const groupedLogs = {};
        logsArray.forEach((log) => {
          if (!groupedLogs[log.date]) {
            groupedLogs[log.date] = [];
          }
          groupedLogs[log.date].push(log);
        });

        // Update state so the UI can display them
        setWorkoutLog(groupedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []); // Empty array => runs once on mount

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!workoutName || !duration || !sets || !reps || weight === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (
      Number(duration) <= 0 ||
      Number(sets) <= 0 ||
      Number(reps) <= 0 ||
      Number(weight) < 0
    ) {
      alert("Values must be positive numbers or 0.");
      return;
    }

    // Convert weight to kg if needed
    const weightInKg =
      unit === "lb" ? (Number(weight) * 0.453592).toFixed(1) : Number(weight);

    const dateKey = formatDate(selectedDate);

    const newWorkout = {
      title: workoutName,
      date: dateKey,
      duration: Number(duration),
      sets: Number(sets),
      reps: Number(reps),
      weight: `${weightInKg} ${unit}`,
    };

    try {
      const response = await fetch("http://localhost:3009/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important for session-based auth
        body: JSON.stringify(newWorkout),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout");
      }

      const savedLog = await response.json();
      console.log("Workout saved to DB:", savedLog);

      // Update local state so the new workout is displayed immediately
      setWorkoutLog((prevLog) => ({
        ...prevLog,
        [dateKey]: prevLog[dateKey]
          ? [...prevLog[dateKey], savedLog]
          : [savedLog],
      }));

      // Clear the form
      setWorkoutName("");
      setDuration("");
      setSets("");
      setReps("");
      setWeight("");
    } catch (error) {
      console.error(error);
      alert("Error saving workout");
    }
  };

  const workoutsForSelectedDate = workoutLog[formatDate(selectedDate)] || [];

  return (
    <main className="log-workouts">
      <h2>Log Your Workouts</h2>

      <div className="calendar-container">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      {/* Workout Form */}
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-group">
          <label htmlFor="workoutName">Workout Name</label>
          <input
            id="workoutName"
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Bench Press"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 30"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sets">Sets</label>
          <input
            id="sets"
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reps">Reps</label>
          <input
            id="reps"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="e.g., 10"
          />
        </div>

        <div className="form-group weight-group">
          <label htmlFor="weight">Weight</label>
          <div className="weight-input">
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 50"
            />
            <button
              type="button"
              className="unit-toggle"
              onClick={() => setUnit(unit === "kg" ? "lb" : "kg")}
            >
              {unit}
            </button>
            <div className="tooltip-container">
              <span className="question-mark">?</span>
              <span className="tooltip-text">
                Input 0 if the exercise does not require weight.
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn">
          Add Workout
        </button>
      </form>

      <br />

      <h3>Workouts on {formatDate(selectedDate)}</h3>
      {workoutsForSelectedDate.length > 0 ? (
        <ul className="workout-list">
          {workoutsForSelectedDate.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.title}</strong>
              {workout.duration !== undefined && ` – ${workout.duration} min`}
              {workout.sets !== undefined && `, ${workout.sets} Sets`}
              {workout.reps !== undefined && ` x ${workout.reps} Reps`}
              {workout.weight && `, ${workout.weight}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts logged for this day.</p>
      )}
    </main>
  );
}

export default LogWorkouts;
