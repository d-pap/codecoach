const mongoose = require("mongoose")

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    //   difficulty: {
    //     type: String,
    //     enum: ['easy', 'medium', 'hard']
    //   },

    //   tags: {
    //     type: String,
    //   },

    exampleInputs: {
      type: String,
      required: true,
    },

    exampleOutputs: {
      type: String,
      required: true,
    },

    testCases: [
      {
        // input-output pairs for testing?
        input: String,
        output: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Problem", problemSchema)
