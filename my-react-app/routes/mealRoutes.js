// routes/mealRoutes.js
import express from "express";
import Meal from "../models/Meal.js";

const router = express.Router();

// Middleware to ensure the user is logged in
function requireAuth(req, res, next) {
  if (!req.session?.user?._id) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  next();
}

// GET /api/meals - Retrieve all meals for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const meals = await Meal.find({ user: userId }).sort({ date: -1 });
    return res.json(meals);
  } catch (error) {
    console.error("Error retrieving meals:", error);
    return res.status(500).json({ error: "Server error retrieving meals." });
  }
});

// POST /api/meals - Create a new meal
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { mealName, calories, date } = req.body;

    // Basic validation
    if (!mealName || !calories || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMeal = new Meal({
      user: userId,
      mealName,
      calories,
      date,
    });

    const savedMeal = await newMeal.save();
    return res.status(201).json(savedMeal);
  } catch (error) {
    console.error("Error creating meal:", error);
    return res.status(500).json({ error: "Server error creating meal." });
  }
});

export default router;
