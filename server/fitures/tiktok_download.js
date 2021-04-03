const tiktok = require("tiktok-scraper")

const headers = {
  "user-agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
  "referer": "https://www.tiktok.com/",
  "cookie": `tt_webid_v2=${process.env.COOKIE_TIKTOK}`,
}
const options = {
  noWaterMark: true,
  headers,
  sessionList: [`sid_tt=${process.env.SESSION_TIKTOK}`],
}
module.exports = async (link) => {
  try {
    const videoMeta = await tiktok.getVideoMeta(link, options)
    console.log(videoMeta)
    return videoMeta.collector
  } catch (error) {
    console.log(error)
    return false
  }
}
