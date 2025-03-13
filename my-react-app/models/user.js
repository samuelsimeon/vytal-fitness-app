// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// This tells MongoDB what our "User" data looks like
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // No two users can have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true // No two users can have the same email
  },
  password: {
    type: String,
    required: true
  }
});

// This part automatically scrambles (hashes) the password before saving it
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// This helps us check if a typed-in password is correct by comparing it to the scrambled one
UserSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// "User" is what we call our model in the database
const User = mongoose.model("User", UserSchema);

export default User;
