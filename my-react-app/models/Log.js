// models/Log.js
import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", LogSchema);
export default Log;
