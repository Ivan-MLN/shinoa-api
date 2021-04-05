const axios = require("axios")
const qs = require("qs")
const cheerio = require("cheerio")

module.exports = async (link) => {
  let config = {
    method: "get",
    url: "https://ssstik.io/",
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Connection: "keep-alive",
      Cookie: process.env.COOKIE_TIKTOK,
      "Upgrade-Insecure-Requests": "1",
    },
  }

  return axios(config)
    .then(function (response) {
      let $ = cheerio.load(response.data)
      const path = $("form").attr("data-hx-post")
      const payload = $("form").attr("include-vals")
      let [tt, ts] = payload.split(",")
      let token1 = tt.slice(4, tt.length - 1).trim()
      let token2 = ts.slice(4, ts.length).trim()
      let data = qs.stringify({
        id: link,
        locale: "en",
        tt: token1,
        ts: token2,
      })
      let config = {
        method: "post",
        url: `https://ssstik.io${path}`,
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "HX-Request": "true",
          "HX-Target": "target",
          "HX-Current-URL": "https://ssstik.io/",
          "HX-Active-Element": "submit",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://ssstik.io",
          Connection: "keep-alive",
          Cookie: process.env.COOKIE_TIKTOK,
          TE: "Trailers",
        },
        data: data,
      }

      return axios(config)
        .then(function (response) {
          let $ = cheerio.load(response.data)
          return {
            caption: $("p").text(),
            mp4_dl: $("a").eq(1).attr("href"),
            mp3_dl: $("a").eq(2).attr("href"),
          }
        })
        .catch(function (error) {
          console.log(error)
          return false
        })
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}
