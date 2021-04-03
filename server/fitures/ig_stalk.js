const axios = require("axios")

let fetchHTML = async (url_ig) => {
  try {
    const url = `${url_ig}?__a=1`
    const hasil = await axios.get(url)
    let { data } = hasil
    return data.graphql.user
  } catch (e) {
    return false
  }
}

module.exports = async (username) => {
  const url = `https://www.instagram.com/${username}/`
  return await fetchHTML(url)
}
