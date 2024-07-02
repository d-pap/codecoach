const express = require("express")
const router = express.Router()
const problemsController = require("../controllers/problemsController")

/* Routes for problem-based tasks:
- /api/problems - see a list of all problems
- /api/problems/:id - view a specific problem
- /api/problems/:id - update a specific problem (admin only)
- /api/problems/:id - delete a specific problem (admin only) 
*/

router
  // at '/problems'
  .route("/")
  .get(problemsController.getAllProblems) // GET /problems - get all problems
  .post(problemsController.createProblem) // POST /problemsController - create a new problem (admin only)

router
  // at '/problems/:id' for a specific problem
  .route("/:id")
  .get(problemsController.getProblem) // GET /problems/:id - get a specific problem
  .patch(problemsController.updateProblem) // POST /problems/:id - update a specific problem (admin only)
  .delete(problemsController.deleteProblem) // DELETE /problems/:id - delete a specific problem (admin only)

module.exports = router
