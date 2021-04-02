const bcrypt = require("bcryptjs")
const User = require("../models/User")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

// Local Strategy
passport.use(
  "login-local",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // Match User
    User.findOne({ email })
      .then((user) => {
        // Create new User
        if (!user) {
          return done(null, false, { message: "Email anda belum terdaftar" })
        } else {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err

            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Wrong password" })
            }
          })
        }
      })
      .catch((err) => {
        return done(null, false, { message: err })
      })
  })
)

passport.use(
  "register-local",
  new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
    // Match User
    User.findOne({ email }).then((user) => {
      if (user) {
        return done("Email tersebut sudah didaftarkan", false)
      } else {
        const newUser = new User({ email, password, username: req.body.username })
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                return done(false, user)
              })
              .catch((err) => {
                return done(err, false)
              })
          })
        })
      }
    })
  })
)

module.exports = passport
