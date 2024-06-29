const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose) // for better formatted ID numbers for ticket IDs

// User stories we need to do and store data for:
// 10. [ ] Notes are assigned to specific users
// 11. [ ] Notes have a ticket #, title, note body, created & updated dates
// 12. [ ] Notes are either OPEN or COMPLETED

const noteSchema = new mongoose.Schema(
  {
    user: {
      // 10. [ ] Notes are assigned to specific users
      // we need to reference the other User schema so it wont be a normal data type
      type: mongoose.Schema.Types.ObjectId, // we're saying it's an ObjectId from another Schema
      required: true,
      ref: "User", // here, we're telling it which schema to reference (the User schema)
    },
    title: {
      // 11. [ ] Notes have a ticket #, title, note body, created & updated dates
      type: String,
      required: true,
    },
    text: {
      // 11. [ ] Notes have a ticket #, title, note body, created & updated dates
      type: String,
      required: true,
    },
    completed: {
      // 12. [ ] Notes are either OPEN or COMPLETED
      type: Boolean,
      default: false,
    },
  },
  {
    // 11. created & updated dates
    // this is a mongoose option so different format (mongoose does this for us)
    timestamps: true,
  }
)

// The ID nums they give us are long and bad and the stakeholder wants to have nice ID nums
// and have them start at number 500 so it doesnt look like they just opened (if they started at 0)
// so to do that, we need to use the `mongoose-sequence` dependency and use the `AutoIncrement` plugin
// and configure the options for it here:
noteSchema.plugin(AutoIncrement, {
  // 11. ticket #
  inc_field: "ticket", // creates a ticket field in our note schema and that will get the sequential number
  id: "ticketNums", // wont see this in our notes collection; it makes a new collection named "counter" will be created
  start_seq: 500,
})

module.exports = mongoose.model("Note", noteSchema)
