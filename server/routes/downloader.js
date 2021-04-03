const express = require("express")
const router = express.Router()
const { msg } = require("../config/msg")
const ig_dl = require("../fitures/ig_download")
const fb_dl = require("../fitures/fb_download")
const tiktok_download = require("../fitures/tiktok_download")

router.get("/ig", async (req, res) => {
  let result = await ig_dl(req.query.link)
  if (!req.query.link) {
    return res.status(400).json({
      status: res.statusCode,
      error: msg("link")[400],
    })
  }
  if (!result) {
    return res.status(400).json({
      status: res.statusCode,
      error: "Error, dikarenakan url tidak valid atau media tersebut berasal dari akun private!",
    })
  }
  let date = new Date(result.taken_at_timestamp * 1000)
  let rapihkan = {
    image: result.display_resources,
    is_video: result.is_video,
    timeUpload: JSON.stringify(date).slice(1, 11),
    uploadBy: result.owner.username,
    jumlah_like: result.edge_media_preview_like.count,
    caption: result.edge_media_to_caption.edges[0].node.text,
  }
  return res.status(200).json({
    status: res.statusCode,
    data: rapihkan,
  })
})

router.get("/fb", async (req, res) => {
  let result = await fb_dl(req.query.link)
  if (!req.query.link) {
    return res.status(400).json({
      status: res.statusCode,
      error: msg("link")[400],
    })
  }
  if (!result) {
    return res.status(400).json({
      status: res.statusCode,
      error: "Error, dikarenakan url tidak valid atau media tersebut berasal dari akun private!",
    })
  }
  return res.status(200).json({
    status: res.statusCode,
    data: result,
  })
})

router.get("/tiktok", async (req, res) => {
  if (!req.query.link) {
    return res.status(400).json({
      status: res.statusCode,
      error: msg("link")[400],
    })
  }
  let result = await tiktok_download(req.query.link)
  if (!result) {
    return res.status(400).json({
      status: res.statusCode,
      error: "Error, dikarenakan url tidak valid atau media tersebut berasal dari akun private!",
    })
  }

  return res.status(200).json({
    status: res.statusCode,
    data: result,
  })
})

module.exports = router
