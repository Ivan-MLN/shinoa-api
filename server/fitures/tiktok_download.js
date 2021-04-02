const tiktok = require("tiktok-scraper")

const headers = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
  referer: "https://www.tiktok.com/",
  cookie: "tt_webid_v2=689854141086886123",
}
const options = {
  noWaterMark: true,
  headers,
}
module.exports = async (link) => {
  try {
    const videoMeta = await tiktok.getVideoMeta(link, options)
    return videoMeta.collector
  } catch (error) {
    return false
  }
}
