const User = require("../models/User")
const Note = require("../models/Note")
const Problem = require("../models/Problem")
const asyncHandler = require("express-async-handler")

// @desc Get all problems
// @route GET /problems
// @access Public
const getAllProblems = asyncHandler(async (req, res) => {
  // Get all problems from MongoDB
  const problems = await Problem.find()

  // If no problems
  if (!problems?.length) {
    return res.status(400).json({ message: "No problems found" })
  }

  res.json(problems)
})

// @desc Get a specifi problem
// @route GET /problems/:id
// @access Public
const getProblem = asyncHandler(async (req, res) => {
  const { id } = req.params
  const problem = await Problem.findById(id).lean()
  if (!problem) {
    return res.status(400).json({ message: "Problem not found" })
  }
  res.json(problem)
})

// @desc Create new problem
// @route POST /problems
// @access Private
const createProblem = asyncHandler(async (req, res) => {
  const { title, description, exampleInputs, exampleOutputs, testCases } = req.body

  // Verify data
  if (!title || !description || !exampleInputs || !exampleOutputs) {
    return res.status(400).json({ message: "Title, description, and example outputs are required" })
  }

  // Check for duplicate
  const duplicate = await Problem.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: `Problem '${title}' already created` })
  }

  // Create and store new prob
  const problemObject = { title, description, exampleInputs, exampleOutputs, testCases }

  const problem = await Problem.create(problemObject)

  if (problem) {
    res.status(201).json({ message: `New problem '${title}' created` })
  } else {
    res.status(400).json({ message: "Invalid problem data received" })
  }
})

// @desc Update a problem 2 (duplicate checks)
// @route PATCH /problems/:id
// @access Private
const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params // extract the problem ID from the URL (instead of the request body)
  /* must be at URL "/problems/:id" to edit a problem (not "/problems")
    so, we extract the problem ID from the URL instead of getting it from the request body.
    if we wanted to allow changes from "/problems" then we would put 'id' in the
    request body field below instead of using 'req.params'. 
  */
  const { title, description, exampleInputs, exampleOutputs, testCases } = req.body

  // Check if problem exists
  const problem = await Problem.findById(id).exec()

  if (!problem) {
    return res.status(400).json({ message: "Problem not found" })
  }

  if (title) {
    const duplicate = await Problem.findOne({ title }).lean().exec()

    // Allow renaming of original problem
    if (duplicate && duplicate._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate problem title" })
    }

    problem.title = title
  }

  // Update problem fields if they are provided
  if (description) problem.description = description
  if (exampleInputs) problem.exampleInputs = exampleInputs
  if (exampleOutputs) problem.exampleOutputs = exampleOutputs
  if (testCases) problem.testCases = testCases

  // Save updated problem
  const updatedProblem = await problem.save()

  res.json({ message: `'${updatedProblem.title}' updated` })
})

// @desc Delete a problem
// @route DELETE /problems/:id
// @access Private
const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Problem ID is required" })
  }

  const problem = await Problem.findById(id).exec()

  // Delete problem
  await problem.deleteOne()

  res.json({ message: `Problem with ID '${id}' deleted` })
})

module.exports = {
  getAllProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
}
