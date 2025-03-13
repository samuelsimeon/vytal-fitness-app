// routes/logRoutes.js
import express from "express";
import Log from "../models/Log.js";

const router = express.Router();

// Middleware to ensure the user is logged in
function requireAuth(req, res, next) {
  // Check for the "_id" property, which is set in the login route
  if (!req.session?.user?._id) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  next();
}

// POST /api/logs - Create a new log entry
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user._id; // Use _id here
    const { title, date, duration, sets, reps, weight } = req.body;

    // Validate that all required fields are provided
    if (!title || !date || !duration || !sets || !reps || !weight) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newLog = new Log({
      user: userId,
      title,
      date,
      duration,
      sets,
      reps,
      weight,
    });

    const savedLog = await newLog.save();
    return res.status(201).json(savedLog);
  } catch (error) {
    console.error("Error creating log:", error);
    return res.status(500).json({ error: "Server error creating log." });
  }
});

// GET /api/logs - Retrieve logs for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user._id; // Use _id here as well
    const logs = await Log.find({ user: userId }).sort({ date: -1 });
    return res.json(logs);
  } catch (error) {
    console.error("Error retrieving logs:", error);
    return res.status(500).json({ error: "Server error retrieving logs." });
  }
});

export default router;
