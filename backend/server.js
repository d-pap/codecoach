require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const { logger, logEvents } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3500

// log the node env defined in .env file
// note: in the real world, this is used to use different settings based on what environment you're working in (dev, prod, etc.)
// based on the NODE_ENV, it might conditionally load middleware or configs and you might see this kind of code here:
/*
        if (process.env.NODE_ENV === 'development') {
            <development-specific settings here>
        } else {
            <production-specific settings here> 
            else could mean 'production' or something 
        }
    */
console.log(process.env.NODE_ENV)

connectDB()

// start logger first
app.use(logger) // logger we made in middleware

app.use(cors(corsOptions)) // use the cors dependency

app.use(express.json()) // add ability to process JSON

app.use(cookieParser())

app.use("/", express.static(path.join(__dirname, "public")))

// ROUTING:
app.use("/", require("./routes/root")) // this is the ROUTING to our root file, which is how we display the index page when we go to localhost3500
app.use("/users", require("./routes/userRoutes")) // create the route for /users
// app.use("/notes", require("./routes/noteRoutes")) // create the route for /notes
app.use("/problems", require("./routes/problemRoutes")) // create the route for /problems
// app.use("/submissions", require("./routes/submissionRoutes"))

app.all("*", (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" })
  } else {
    res.type("txt").send("404 Not Found")
  }
})

// use error handler at the end, right before listening begins
app.use(errorHandler) // error handler we made in middleware

// use error handler at the end, right before listening begins
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
// if there's an error connecting to DB, make a log file and log the error
mongoose.connection.on("error", (err) => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log")
})
