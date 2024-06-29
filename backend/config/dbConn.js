const mongoose = require("mongoose")

// function to connect to the DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
