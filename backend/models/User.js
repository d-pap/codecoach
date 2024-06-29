const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // no dupe emails
      trim: true, // trims whitespace
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      // can either be student, instructor, or admin
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    // Add more fields here later like profile info, etc.?
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
)

module.exports = mongoose.model("User", userSchema)
