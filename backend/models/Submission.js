const mongoose = require("mongoose")

/* 
NOTES ON HOW IT WILL WORK WITH JUDGE0 API:
    1) user submits code and frontend sends code to the backend
    2) backend processes it and sends the code to judge0
    3) judge0 returns execution result to backend
    4) backend saves submission data to DB
    5) backend sends the result to frontend to display to user
*/

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      // reference to user who submitted
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      // reference to the problem
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    code: {
      // submitted code
      type: String,
      required: true,
    },

    status: {
      // submission status
      type: String,
      enum: ["accepted", "wrong answer", "runtime error", "compilation error"],
      required: true,
    },

    executionTime: {
      // execution time in milliseconds
      type: Number,
    },

    memoryUsage: {
      // memory usage in bytes
      type: Number,
    },

    output: {
      // output of code execution
      type: String,
    },

    error: {
      // error message if any
      type: String,
    },

    timestamp: {
      // timestamp of submission
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Submission", submissionSchema)
