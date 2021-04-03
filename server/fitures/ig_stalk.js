const axios = require("axios")

let fetchHTML = async (url_ig) => {
  const url = `${url_ig}?__a=1`
  const config = {
    method: "get",
    url,
    headers: {
      "User-Agent": process.env.IG_USER,
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
