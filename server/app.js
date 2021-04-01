require("dotenv/config")
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")

const passport = require("./config/passport_local_strategy")
const routes = require("./routes/main")

const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on("error", console.error.bind(console, "Database connection error!"))
db.once("open", () => {
  console.log("DB is connected now!")
})

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    secret: "very secret this is",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
  })
)
app.use(flash())

app.use("/views", express.static(__dirname + "../../client/public/"))
app.set("view-engine", "ejs")

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/", routes)

app.listen(process.env.PORT, () => console.log(`server running on localhost:${process.env.PORT}`))
