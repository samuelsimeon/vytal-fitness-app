// src/LogMeals.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//import "./LogMeals.css";

function LogMeals() {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealLog, setMealLog] = useState({});

  // Fetch all meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:3009/api/meals", {
          credentials: "include", // Send session cookie
        });
        if (!res.ok) {
          throw new Error("Failed to fetch meals");
        }
        const mealsArray = await res.json();

        // Group meals by date
        const groupedMeals = {};
        mealsArray.forEach((meal) => {
          if (!groupedMeals[meal.date]) {
            groupedMeals[meal.date] = [];
          }
          groupedMeals[meal.date].push(meal);
        });

        setMealLog(groupedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  // Helper to format date as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName || !calories) {
      alert("Please fill in all fields.");
      return;
    }
    if (Number(calories) <= 0) {
      alert("Calories must be a positive number.");
      return;
    }

    const dateKey = formatDate(selectedDate);

    const newMeal = {
      mealName,
      calories: Number(calories),
      date: dateKey,
    };

    try {
      const response = await fetch("http://localhost:3009/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newMeal),
      });

      if (!response.ok) {
        throw new Error("Failed to save meal");
      }

      const savedMeal = await response.json();
      console.log("Meal saved to DB:", savedMeal);

      // Update local state so the new meal shows immediately
      setMealLog((prevLog) => ({
        ...prevLog,
        [dateKey]: prevLog[dateKey]
          ? [...prevLog[dateKey], savedMeal]
          : [savedMeal],
      }));

      // Clear the form
      setMealName("");
      setCalories("");
    } catch (error) {
      console.error(error);
      alert("Error saving meal");
    }
  };

  const mealsForSelectedDate = mealLog[formatDate(selectedDate)] || [];

  return (
    <div className="log-meals-container">
      <h1>Log Your Meals</h1>
      <p>Track your daily nutrition to optimize your fitness goals.</p>

      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <form onSubmit={handleSubmit} className="meal-form">
        <input
          type="text"
          placeholder="Enter meal name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button type="submit">Log Meal</button>
      </form>

      <h3>Meals on {formatDate(selectedDate)}</h3>
      {mealsForSelectedDate.length > 0 ? (
        <ul>
          {mealsForSelectedDate.map((meal) => (
            <li key={meal._id}>
              <strong>{meal.mealName}</strong> – {meal.calories} cal
            </li>
          ))}
        </ul>
      ) : (
        <p>No meals logged for this day.</p>
      )}
    </div>
  );
}

export default LogMeals;
