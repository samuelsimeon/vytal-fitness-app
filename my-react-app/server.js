// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

// Import your auth routes
import authRoutes from "./routes/auth.js";
// Import log routes
import logRoutes from "./routes/logRoutes.js";
// Import meal routes
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3009;

// Set up EJS templating
app.set("view engine", "ejs");
app.set("views", "./views"); // Ensure there's a "views" folder in your project root

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

// Middleware for JSON parsing
app.use(express.json());

// Configure CORS to allow credentials and set the correct origin
app.use(
  cors({
    origin: "http://localhost:5174", // Change this if your client runs on a different URL
    credentials: true,
  })
);

// Configure cookie-parser middleware
app.use(cookieParser());

// Configure session middleware
app.use(
  session({
    secret: "someSuperSecretKey", // Replace with a strong secret in production!
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Mount auth routes (for registration, login, etc.)
app.use("/api/auth", authRoutes);

// Mount log routes
app.use("/api/logs", logRoutes);

// Mount meal routes
app.use("/api/meals", mealRoutes);

// Server-rendered dashboard route using EJS templating
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { username: "SampleUser" });
});

// A simple API test route
app.get("/", (req, res) => {
  res.send("Hello from the Fitness App API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
