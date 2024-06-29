const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

// router.route('/') // the '/' is saying: "we're already at '/users' and this (the '/') is the root of that"
//     .get(usersController.getAllUsers)
//     .post(usersController.createNewUser)
//     .patch(usersController.updateUser)
//     .delete(usersController.deleteUser)

router
  .route("/")
  .get(usersController.getAllUsers) // GET /users - get all users
  .post(usersController.createNewUser) // POST /users - create a new user

router
  .route("/:id")
  .get(usersController.getUser) // GET /users/:id - get a specific user
  .patch(usersController.updateUser) // POST /users/:id - update a specific user
  .delete(usersController.deleteUser) // DELETE /users/:id - delete a specific user

module.exports = router
