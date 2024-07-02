/* Routes for authorization-based tasks here:
- /api/auth/register
- /api/auth/login
- /api/auth/logout
*/
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router
  .route("/register")
  // POST /auth/register - register/make a new account
  .post(authController.registerUser)

router
  .route("/login")
  // POST /auth/login - log into existing account
  .post(authController.loginUser)

router
  .route("/logout")
  // POST /auth/logout - log into existing account
  .post(authController.logoutUser)

module.exports = router
