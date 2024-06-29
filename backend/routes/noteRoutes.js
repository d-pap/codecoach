const express = require("express")
const router = express.Router()
const notesController = require("../controllers/notesController")

router
  .route("/") // we're currently at '/notes' and this is the root page of that
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote)

module.exports = router
