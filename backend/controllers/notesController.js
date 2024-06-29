// need the db models and aync handler
const Note = require("../models/Note")
const User = require("../models/User")
const asyncHandler = require("express-async-handler")

/* functions that HTTP methods will use 

1) GET:     get all notes
2) POST:    add a new note
3) PATCH:   update a note
4) DELETE:  delete a note
*/

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  // get all notes from the DB
  const notes = await Note.find().lean()

  // if no notes, return a message
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" })
  }

  // Add username to each note before sending response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(notes.map(async (note) => {
      // use map to create an array of promises that fetch the username for each note's user
      // use promise.all to wait for all promises to resolve
      // combine note data with username and return it
      const user = await User.findById(note.user).lean().exec()
      return { ...note, username: user.username } // '...' is shorthand to copy all properties of 'note' to make a new object with 'user.username'
    })
  )
  /* the equivalent way using a for...of loop:
  const notesWithUser = []
  for (const note of notes) {
    const user = await User.findById(note.user).lean().exec()
    notesWithUser.push({ ...note, username: user.username })
  }
  */
 
  // return all the notes with usernames
  res.json(notesWithUser)
})

// @desc Add a new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  // extract note details from request body
  // const { user, title, text, completed } = req.body
  const { user, title, text } = req.body

  // confirm data (all reqd fields are there)
  if (!user || !title || !text) {
    return res.status(400).json({ message: "Fill in required fields" })
  }

  // check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate note title'})
  }

  // create and store the new note
  const note = await Note.create({ user, title, text })

  // respond with success or error message
  if (note) {
    res.status(201).json({ message: 'New note created' })
  } else {
    res.status(400).json({ message: "Invalid note data received" })
  }
})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body

  // confirm data
  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // check if note exists
  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: "Note not found" })
  }

  // check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec()

  // allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate note title' })
  }

  // update the note fields
  note.user = user
  note.title = title
  note.text = text
  note.completed = completed

  // save updated note
  const updatedNote = await note.save()

  // res.json({ message: `${updatedNote.title} updated` })
  res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  // get id from request body
  const { id } = req.body

  // confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID Required" })
  }

  // see if the note exists first
  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: "Note not found" })
  }

  // find and delete the note by ID
  const result = await note.deleteOne()

  // respond with success message
  const reply = `Note '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
}
