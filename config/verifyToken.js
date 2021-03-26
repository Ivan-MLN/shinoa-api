const jwt = require("jsonwebtoken")
const verify = (req, res, next) => {
  const token = req.header("jwt_auth-token")
  if (!token)
    return res.status(400).json({
      status: res.statusCode,
      message: "Access denied",
    })
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified
    next()
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: "Invalid token",
    })
  }
}

module.exports = verify
