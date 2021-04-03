const axios = require("axios")

const fetchHTML = async (url_ig) => {
  const adakah = url_ig.match(/\?/g)
  const url = `${adakah ? url_ig + "&__a=1" : url_ig + "?__a=1"}`

  const config = {
    method: "get",
    url,
    headers: process.env.HEADER_IG,
  }

  return await axios(config)
    .then(async function (response) {
      return response.data.graphql.shortcode_media
    })
    .catch(function (error) {
      return false
    })
}

module.exports = async (link) => {
  try {
    return await fetchHTML(link)
  } catch (e) {
    return false
  }
}
