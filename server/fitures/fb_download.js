const cheerio = require("cheerio")
const axios = require("axios")

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, (match) => String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16)))
}

let fetchHTML = async (url) => {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

module.exports = async (link) => {
  try {
    const $ = await fetchHTML(link)
    let script = $("script").eq(3).html()
    let obj = unicodeToChar(script)
    let pre = obj.replace(/\\\//g, "/")
    let final = pre.replace(/\\/g, "")
    return JSON.parse(final)
  } catch (e) {
    return false
  }
}
