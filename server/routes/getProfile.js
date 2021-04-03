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

  let result = await ig_stalk(req.query.username)
  if (!result)
    return res.status(400).json({
      status: res.statusCode,
      error: "Username tersebut tidak ditemukan",
    })
  let user = {
    username: result.username,
    full_name: result.full_name,
    bio: result.biography,
    akun_private: result.is_private,
    akun_terverifikasi: result.is_verified,
    profile: {
      hd: result.profile_pic_url_hd,
      no_hd: result.profile_pic_url,
    },
  }
  return res.status(200).json({
    status: res.statusCode,
    data: user,
  })
})

module.exports = router
