const express = require("express")
const router = express.Router()
const problemsController = require("../controllers/problemsController")

router
  // at '/problems'
  .route("/")
  .get(problemsController.getAllProblems) // GET /problems - get all users
  .post(problemsController.createProblem) // POST /problemsController - create a new problem

router
  // at '/problems/:id' for a specific problem
  .route("/:id")
  .get(problemsController.getProblem) // GET /problems/:id - get a specific problem
  .patch(problemsController.updateProblem) // POST /problems/:id - update a specific problem
  .delete(problemsController.deleteProblem) // DELETE /problems/:id - delete a specific problem

module.exports = router
