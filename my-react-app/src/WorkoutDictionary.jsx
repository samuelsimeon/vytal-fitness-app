import React, { useState } from "react";
import "./WorkoutDictionary.css";

// Import muscle map image
import MuscleMap from "/images/adobediagram.png";

const muscleData = {
  chest: { name: "Chest", exercises: ["Bench Press", "Push-Ups", "Chest Fly", "Incline Bench Press", "Dips", "Cable Fly"] },
  back: { name: "Back", exercises: ["Pull-Ups", "Deadlifts", "Bent-over Rows", "Lat Pulldown", "Face Pulls", "Seated Row"] },
  legs: { name: "Legs", exercises: ["Squats", "Leg Press", "Lunges", "Leg Curls", "Calf Raises", "Step-ups"] },
  arms: { name: "Arms", exercises: ["Bicep Curls", "Triceps Dips", "Hammer Curls", "Overhead Triceps Extension", "Preacher Curls", "Cable Curl"] },
  abs: { name: "Abs", exercises: ["Crunches", "Hanging Leg Raises", "Russian Twists", "Plank", "Ab Rollouts", "Bicycle Crunches"]},
};

function WorkoutDictionary() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscleData[muscle]);
  };

  const closePopup = () => {
    setSelectedMuscle(null);
  };

  return (
    <div className="workout-dictionary">
      <h2>Interactive Muscle Map</h2>
      <p>Click on a muscle to see relevant exercises.</p>

      <div className="muscle-map-container">
        <img src={MuscleMap} alt="Muscle Map" className="muscle-map" />

        {/* Clickable Areas */}
        <div className="muscle-area chest" onClick={() => handleMuscleClick("chest")} />
        <div className="muscle-area back" onClick={() => handleMuscleClick("back")} />
        <div className="muscle-area legs" onClick={() => handleMuscleClick("legs")} />
        <div className="muscle-area arms" onClick={() => handleMuscleClick("arms")} />
        <div className="muscle-area abs" onClick={() => handleMuscleClick("abs")} />
      </div>

      {/* Pop-up for Exercises */}
      {selectedMuscle && (
        <div className="exercise-popup">
          <div className="popup-header">
            <h3>{selectedMuscle.name}</h3>
            <button className="close-btn" onClick={closePopup}>&times;</button>
          </div>

          <div className="exercise-grid">
            {selectedMuscle.exercises.map((exercise, index) => (
              <div key={index} className="exercise-box">
                {exercise}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutDictionary;
