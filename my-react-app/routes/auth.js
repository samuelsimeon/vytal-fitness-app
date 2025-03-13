// routes/auth.js
import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js"; // Ensure file name/case matches exactly

const router = express.Router();

/* 
  ========== REGISTER ==========
  POST /api/auth/register
  Creates a new user with username, email, and password.
  Validates the input using express-validator.
*/
router.post(
  "/register",
  [
    // Validate and sanitize fields
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      // Check if a user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ error: "Server error during registration" });
    }
  }
);

/* 
  ========== LOGIN ==========
  POST /api/auth/login
  Checks if the user's email/password match, then returns user data.
  On success, stores user info in the session.
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password using the user's comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Store user info in session using _id for consistency
    req.session.user = {
      _id: user._id,      // Using _id is standard in MongoDB/Mongoose
      username: user.username,
      email: user.email,
    };

    res.json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

/* 
  ========== LOGOUT ==========
  POST /api/auth/logout
  Destroys the session to log the user out.
*/
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ error: "Error logging out" });
    }
    // Clear the session cookie as well
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

/* 
  ========== UPDATE USER ==========
  PUT /api/auth/update/:id
  Updates user fields (username, email, password) by ID.
*/
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // Will be hashed via pre-save hook

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Server error during user update" });
  }
});

/* 
  ========== DELETE USER ==========
  DELETE /api/auth/delete/:id
  Deletes the user document by ID.
*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and remove the user
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Server error during user deletion" });
  }
});

/* 
  ========== SESSION TEST ==========
  GET /api/auth/session-test
  Returns the current session data, if any.
*/
router.get("/session-test", (req, res) => {
  if (!req.session.user) {
    return res.json({ message: "No user in session" });
  }
  return res.json({
    message: "Session data found",
    user: req.session.user,
  });
});

export default router;
