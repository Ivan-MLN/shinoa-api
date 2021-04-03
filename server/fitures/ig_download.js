const axios = require("axios")

const fetchHTML = async (url_ig) => {
  const adakah = url_ig.match(/\?/g)
  const url = `${adakah ? url_ig + "&__a=1" : url_ig + "?__a=1"}`
  try {
    let response = await axios.get(url)
    return response.data.graphql.shortcode_media
  } catch (e) {
    return false
  }
}

module.exports = async (link) => {
  try {
    return await fetchHTML(link)
  } catch (e) {
    return false
  }
}
