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
      "X-IG-App-ID": "936619743392459",
      "X-IG-WWW-Claim": "hmac.AR2Dw51jYa4uP_9Qchmw8to46wzsFoDSES-XABPMgVtqbVDl",
      Origin: "https://www.instagram.com",
      Connection: "keep-alive",
      Referer: "https://www.instagram.com/",
      Cookie:
        "ig_did=92C19BA3-48B4-4961-8FDB-D74D6B43BCFB; ig_nrcb=1; mid=YGWiMAAEAAEbpUG0Npw4Qe2WkjTU; fbm_124024574287414=base_domain=.instagram.com; shbid=5443; shbts=1617359300.0096235; fbsr_124024574287414=tLlhdKJ4qbCJmVwdWai-0-zf4p_xAKCHV0tWX9XBa4U.eyJ1c2VyX2lkIjoiMTAwMDU3MDU5MjQxNDk1IiwiY29kZSI6IkFRQldvWldNU2Y3ZUFaNHFDQ05QWWZydVBVZ25yUmtGQWRmY2ZjRUF4dHM3OHFvVW5PeGxqeFFoeF85dVZQOGZiSkdldnl1NHhUQXJTMEtIR01oX0FRR2FweURVWW5JRkliUXU0a0JwUldyYzlzWkxBTzJuWTJHQjc0NmpTV3lMX0JtclRQMXZyRUE4SkVDMmZDXzBza3hyVkxoMXprS2wyYU8xcUxtVWcxUVZ5YU5STldoMndHOW1temZPZWJKLWVRODVrWVFlSG1Cc2ZYT2M1RDZXY1prcnYtVDNvb2xfVFBXN21TQkhVTnpuWUVBSmoxaGRIWHpkcUtvc0dXeTRhMFBsQUZjWHNHNldLMkg0MHV1RHo0OG1mNlBSY1ZTY0ZZZmQzek1YSEpsbFk4N3h2eUtTOGl4TDBFZXpJTzhhMUdZZktpOENud1hveWJNYkJsX1JwaGR0Iiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUQyZ1lOeVN0NlpBVlpDZEhpRWZaQlFzME0yb3lkMUtaQlRTd0pCQnFaQ3F3TzdWV1J2WkN6eHJ4NWNRTkliNUI1STh6NmdGaUdzUEZYQ0JKc0o4WkFGOHhQaGkyeG1waUtJbnp5bVNqYnBmRExMd1pDbGprcFVlMEliSlpDZ21UaG5jenI0WkIzeHNaQ1QzR25IQ0JSNzNsQmF6Y2dERG53aXhWNnR2YzBJNnRBdiIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE3NDIzMTkzfQ; rur=NAO; csrftoken=r6epATFu40rcdgbkZpqJfpwoWRUwLbpg; ds_user_id=17771432427; sessionid=17771432427%3AHHm6HXaZJ8wfaP%3A12; ig_did=31D4EAAA-1660-429D-9C2E-F627300387FE; csrftoken=2jFccX7FG5PtcIOgdGEvxqHRaYOvVSsg; mid=YFs_GQAEAAFZp2QypgABKu37RqIT; ig_nrcb=1; rur=NAO; ds_user_id=17771432427",
      TE: "Trailers",
    },
  }

  return await axios(config)
    .then(function (response) {
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
