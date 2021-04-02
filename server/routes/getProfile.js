const express = require("express")
const router = express.Router()
const ig_stalk = require("../fitures/ig_stalk")
const { msg } = require("../config/msg")

router.get("/ig", async (req, res) => {
  if (!req.query.username)
    return res.status(400).json({
      status: res.statusCode,
      error: msg("username", false)[400],
    })

  let user = await ig_stalk(req.query.username)
  if (!user)
    return res.status(406).json({
      status: res.statusCode,
      error: msg("username", false)[406],
    })

  return res.status(200).json({
    status: res.statusCode,
    data: user,
  })
})

module.exports = router
