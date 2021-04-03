const axios = require("axios")

let fetchHTML = async (url_ig) => {
  const url = `${url_ig}?__a=1`
  const config = {
    method: "get",
    url,
    headers: process.env.HEADER_IG,
  }

  return axios(config)
    .then(function (response) {
      return response.data.graphql.user
    })
    .catch(function (error) {
      return false
    })
}

module.exports = async (username) => {
  const url = `https://www.instagram.com/${username}/`
  try {
    return await fetchHTML(url)
  } catch (e) {}
}
