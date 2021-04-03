const axios = require("axios")

let fetchHTML = async (url_ig) => {
  const url = `${url_ig}?__a=1`
  const config = {
    method: "get",
    url,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-IG-App-ID": "936619743392459",
      "X-IG-WWW-Claim": "hmac.AR2Dw51jYa4uP_9Qchmw8to46wzsFoDSES-XABPMgVtqbURm",
      Origin: "https://www.instagram.com",
      Connection: "keep-alive",
      Referer: "https://www.instagram.com/",
      Cookie:
        "ig_did=92C19BA3-48B4-4961-8FDB-D74D6B43BCFB; ig_nrcb=1; mid=YGWiMAAEAAEbpUG0Npw4Qe2WkjTU; fbm_124024574287414=base_domain=.instagram.com; shbid=5443; shbts=1617359300.0096235; csrftoken=r6epATFu40rcdgbkZpqJfpwoWRUwLbpg; ds_user_id=17771432427; sessionid=17771432427%3AHHm6HXaZJ8wfaP%3A12; fbsr_124024574287414=B34tDolbjg2it2dH9dkf8rtRh151f7hQ4umWV4rEWVU.eyJ1c2VyX2lkIjoiMTAwMDU3MDU5MjQxNDk1IiwiY29kZSI6IkFRQUhTelh4SnBrLWxsZmdnS0VmU2R5STJzRDZCTEFTcjNXTDFoQ1lEQy1ZeVUzZTNybzBpXzc5WGgxbjBKQkU2UDdLUl9lUFRaa2VPQmE4X1FQTVBpWklrTDlPejVTR2t0TldIaklJTDJDZHBWcjJnTW1RTnk2WXFmWXBOUUwxSTl2a2xlVTF4dFhVQ1U3TW4ySmU5bXVuRnRfX09sLS15V0dSOXNVWnd1MkNfS2xucm43SzBvSEI0RkY3aTZGOXNIdURvaXBOdkZUN0FlQ1hTaFlWSk5CLTR0UmNSdUFYb2NqVWhWWi1FYzJRbTV5S3RoOER5UFFwcUt0V082X0hSUWEwOGVXS2pieElCRHJXdHR1QTEzSXlYSEo0ZlhRVTg0czlHZURCS3J3SnpTanVYYnVUTnVWZzdVU01zM1BmU1EyRXlFZkFBOFhUMHZvcjFQSDYwQzY3Iiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUF3bGx2WDcwcDV1U2c0bXd2MjY5S2d1QUxvMUlPejlwUUUxZWFjVXBqZWY1MklWcHpYUldaQnZaQnIwc1pCNFB5WkFTUGwxUjVGSUR2ZUk5aldGNWdoOG5EejRvMGVnbWlaQmJ6UFNlbXBaQ1RWV3E4QWZxRVVWcHlSVEJYYjlmWkNVb1hEM1cwYm55Z2JKY1ljVnU0Z3ljWUt0Vkx1Skd3bGozRk1tcURGIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTc0NjI0Nzh9; rur=NAO; ig_did=31D4EAAA-1660-429D-9C2E-F627300387FE; csrftoken=2jFccX7FG5PtcIOgdGEvxqHRaYOvVSsg; mid=YFs_GQAEAAFZp2QypgABKu37RqIT; ig_nrcb=1; ds_user_id=17771432427; rur=NAO",
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
