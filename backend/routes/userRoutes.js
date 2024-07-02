/* Routes for user-based tasks here:
- /api/users - see all users (admin only)
- /api/users/:id - see a specific user (admin only?)
- /api/users/:id - update a specific user ???
- /api/users/:id - delete a specific user ???

- /api/users/update - allow a user to update their account info
- /api/users/:id/statistics - view results of a users past submissions
*/
const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router
  .route("/")
  .get(usersController.getAllUsers) // GET /users - get all users (admin only)
  .post(usersController.createNewUser) // POST /users - create a new user (admin only??? since register (make new user) is in authRoutes)

router
  .route("/:id")
  .get(usersController.getUser) // GET /users/:id - get a specific user (admin only?)
  .patch(usersController.updateUser) // PATCH /users/:id - update a specific user
  .delete(usersController.deleteUser) // DELETE /users/:id - delete a specific user

module.exports = router
