const express = require("express")
const router = express.Router()
const verify = require("../config/verifyToken")
const { msg } = require("../config/msg")
const cheerio = require("cheerio")
const axios = require("axios")
const tiktok = require("tiktok-scraper")

router.get("/ig", verify, async (req, res) => {
  async function fetchHTML(url) {
    try {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    } catch (e) {
      return res.status(400).json({
        status: res.statusCode,
        message: msg(null, "URL yang anda kirimkan tidak valid!").pesan,
      })
    }
  }
  const $ = await fetchHTML(req.query.link)
  let script = $("script").eq(4).html()
  let { entry_data } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1])
  try {
    let is_private = entry_data.ProfilePage[0].graphql.user.is_private
    if (is_private) {
      return res.status(400).json({
        status: res.statusCode,
        message: msg(null, "Tidak bisa mendownload media dari akun private !").pesan,
      })
    }
  } catch (e) {
    let {
      entry_data: {
        PostPage: {
          [0]: {
            graphql: { shortcode_media },
          },
        },
      },
    } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1])
    try {
      if (shortcode_media.is_video) {
        let vid = shortcode_media.video_url
        let thumb = shortcode_media.thumbnail_src
        let durasi = shortcode_media.video_duration
        let uploader = shortcode_media.owner.username
        let caption = shortcode_media.edge_media_to_caption.edges[0].node
        let obj = {
          vid,
          thumb,
          durasi,
          uploader,
          caption,
        }
        return res.status(200).json({
          status: res.statusCode,
          data: obj,
        })
      } else {
        let uploader = shortcode_media.owner.username
        let thumb = shortcode_media.display_resources
        let caption = shortcode_media.edge_media_to_caption.edges[0].node
        let obj = {
          thumb,
          uploader,
          caption,
        }
        return res.status(200).json({
          status: res.statusCode,
          data: obj,
        })
      }
    } catch (e) {
      if (e instanceof TypeError) {
        return res.status(406).json({
          status: res.statusCode,
          message: msg("link")[406],
        })
      } else {
        return res.status(500).json({
          status: res.statusCode,
          message: msg()[500],
        })
      }
    }
  }
})

router.get("/fb", verify, async (req, res) => {
  function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, (match) => String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16)))
  }
  try {
    async function fetchHTML(url) {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    }
    const $ = await fetchHTML(req.query.link)
    let script = $("script").eq(3).html()
    let obj = unicodeToChar(script)
    let pre = obj.replace(/\\\//g, "/")
    let final = pre.replace(/\\/g, "")
    return res.status(200).json({
      status: res.statusCode,
      data: JSON.parse(final),
    })
  } catch (e) {
    return res.status(406).json({
      status: res.statusCode,
      message: msg("link")[406],
    })
  }
})

router.get("/tiktok", verify, async (req, res) => {
  const headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
    referer: "https://www.tiktok.com/",
    cookie: "tt_webid_v2=689854141086886123",
  }
  const options = {
    noWaterMark: true,
  }

  try {
    const videoMeta = await tiktok.getVideoMeta(req.params.link, options)
    return res.status(200).json({
      status: res.statusCode,
      data: videoMeta,
    })
  } catch (error) {
    console.log(error)
    return res.status(406).json({
      status: res.statusCode,
      message: msg("link")[406],
    })
  }
})

module.exports = router
