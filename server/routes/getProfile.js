const express = require("express")
const router = express.Router()
const axios = require("axios")
const cheerio = require("cheerio")
const { msg } = require("../config/msg")

router.get("/ig", async (req, res) => {
  const BASE_URL = `https://www.instagram.com/${req.params.username}/`
  async function fetchHTML(url) {
    try {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    } catch (e) {
      return res.status(400).json({
        status: res.statusCode,
        data: msg(null, "URL yang anda kirimkan tidak valid!").pesan,
      })
    }
  }
  try {
    const $ = await fetchHTML(BASE_URL)
    let script = $("script").eq(4).html()
    let {
      entry_data: {
        ProfilePage: {
          [0]: {
            graphql: { user },
          },
        },
      },
    } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1])
    return res.status(200).json({
      status: res.statusCode,
      data: user,
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
