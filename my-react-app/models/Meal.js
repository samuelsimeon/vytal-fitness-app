// models/Meal.js
import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  // Storing as a string (e.g., "2025-03-15") for consistency with your approach
  date: {
    type: String,
    required: true,
  },
});

const Meal = mongoose.model("Meal", MealSchema);
export default Meal;
