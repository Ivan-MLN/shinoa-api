const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { registerValidation } = require("../config/validation")
const jwt = require("jsonwebtoken")
const verify = require("../config/verifySudo")

router.get("/", verify, async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    })
  }

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Email tersebut sudah digunakan.",
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)

  const createUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  })

  try {
    const user = await createUser.save()
    res.json(user)
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: "Gagal registrasi, silahkan coba dilain waktu.",
    })
  }
})

router.post("/login", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email })
  if (!emailExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "Email anda belum terdaftar.",
    })

  const validPwd = await bcrypt.compare(req.body.password, emailExist.password)
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: "Password anda salah.",
    })
  let token
  if (emailExist.email == process.env.OWNER) {
    token = jwt.sign({ _id: emailExist._id }, process.env.SUDO_KEY)
  } else {
    token = jwt.sign({ _id: emailExist._id }, process.env.SECRET_KEY)
  }
  res.header("jwt_auth-token", token).json({
    token: token,
  })
})

module.exports = router
