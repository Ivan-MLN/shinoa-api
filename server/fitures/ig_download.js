const axios = require("axios")

const fetchHTML = async (url_ig) => {
  const adakah = url_ig.match(/\?/g)
  const url = `${adakah ? url_ig + "&__a=1" : url_ig + "?__a=1"}`
  const config = {
    method: "get",
    url,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-IG-App-ID": process.env.IG_APP_ID,
      "X-IG-WWW-Claim": process.env.IG_CLAIM,
      Origin: "https://www.instagram.com",
      Connection: "keep-alive",
      Referer: "https://www.instagram.com/",
      Cookie: process.env.IG_COOKIE,
      TE: "Trailers",
    },
  }

  return await axios(config)
    .then(async function (response) {
      return response.data.graphql.shortcode_media
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}

module.exports = async (link) => {
  try {
    return await fetchHTML(link)
  } catch (e) {
    console.log(e)
    return false
  }
}
