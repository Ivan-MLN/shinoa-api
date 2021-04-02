const axios = require("axios")
const cheerio = require("cheerio")

let fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url)
    return cheerio.load(data)
  } catch (e) {
    console.log("axios")
    console.log(e)
    return false
  }
}

module.exports = async (username) => {
  const BASE_URL = `https://www.instagram.com/${username}/`
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
    return user
  } catch (error) {
    console.log(error)
    return false
  }
}
