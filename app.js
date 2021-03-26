const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv/config")

// middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

const user_routes = require("./routes/user")
const dl_routes = require("./routes/downloader")
const stalk_routes = require("./routes/getProfile")

app.use("/user", user_routes)
app.use("/dl", dl_routes)
app.use("/stalk", stalk_routes)

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

db.on("error", console.error.bind(console, "Database connection error!"))
db.once("open", () => {
  console.log("DB is connected now!")
})

app.listen(process.env.PORT, () => {
  console.log(`server running on localhost:${process.env.PORT}`)
})
