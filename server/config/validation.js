const Joi = require("@hapi/joi")

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
  })

  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  return schema.validate(data)
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/user/login")
}

function isOwner(req, res, next) {
  if (req.isAuthenticated() && req.user.email == process.env.OWNER) {
    return next()
  }
  res.redirect("/user/login")
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.isLoggedIn = isLoggedIn
module.exports.isOwner = isOwner
