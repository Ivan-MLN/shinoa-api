const express = require("express")
const routes = express.Router()
const User = require("../models/User")
const { registerValidation, loginValidation, isLoggedIn, isOwner } = require("../config/validation")
const path = require("path")
const passport = require("passport")
const ejs = require("ejs")
require("dotenv/config")

routes.get("/", isOwner, async (req, res) => {
  try {
    const showUser = await User.find()
    res.json(showUser)
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: e,
    })
  }
})

routes.get("/profile", isLoggedIn, async (req, res) => {
  const html = await ejs.renderFile(path.join(__dirname + "../../../client/sc_code/template_sbadmin/layout.ejs"), { url: process.env.BASE_URL, file: "./myProfile.ejs", title: "My profile", user: req.user }, { async: true })
  return res.send(html)
})

routes.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
    )

    res.json(updateUser)
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: e,
    })
  }
})

routes.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id })
    res.json(deleteUser)
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: e,
    })
  }
})

routes.get("/register", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/docs")
  res.render(path.join(__dirname + "/../../client/sc_code/template_sbadmin/register.ejs"), { url: process.env.BASE_URL, error: req.flash("rerror") })
})

routes.post("/register", async (req, res, next) => {
  let { error } = registerValidation(req.body)
  if (error) {
    req.flash("rerror", error.details[0].message)
    return res.redirect("/user/register")
  }
  passport.authenticate("register-local", function (err, user, info) {
    if (err) {
      req.flash("rerror", err)
      return res.redirect("/user/register")
    }
    req.logIn(user, function (err) {
      if (err) {
        req.flash("rerror", err)
        return res.redirect("/user/register")
      }
      return res.redirect("/docs")
    })
  })(req, res, next)
})

routes.get("/login", async (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/docs")
  res.render(path.join(__dirname + "/../../client/sc_code/template_sbadmin/login.ejs"), { url: process.env.BASE_URL, error: req.flash("lerror") })
})

routes.post("/login", (req, res, next) => {
  let { error } = loginValidation(req.body)
  if (error) {
    req.flash("lerror", error.details[0].message)
    return res.redirect("/user/login")
  }
  passport.authenticate("login-local", function (err, user, info) {
    if (err) {
      req.flash("lerror", err.message)
      return res.redirect("/user/login")
    }
    if (user == "null") {
      req.flash("lerror", "Email anda belum terdaftar!")
      return res.redirect("/user/login")
    }
    req.logIn(user, function (err) {
      if (err) {
        req.flash("lerror", err)
        return res.redirect("/user/login")
      }
      return res.redirect("/docs")
    })
  })(req, res, next)
})

routes.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

routes.get("/forgot", async (req, res) => {
  res.render(path.join(__dirname + "/../../client/sc_code/template_sbadmin/forgot-password.ejs"), { url: process.env.BASE_URL })
})

module.exports = routes
