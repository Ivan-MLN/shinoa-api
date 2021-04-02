const cheerio = require("cheerio")
const axios = require("axios")

let fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url)
    return cheerio.load(data)
  } catch (e) {
    console.log("axios")
    return false
  }
}

module.exports = async (link) => {
  try {
    const $ = await fetchHTML(link)
    console.log($)
    let script = $("script").eq(4).html()
    let {
      entry_data: {
        PostPage: {
          [0]: {
            graphql: { shortcode_media },
          },
        },
      },
    } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1])
    if (shortcode_media.is_video) {
      let vid = shortcode_media.video_url
      let thumb = shortcode_media.thumbnail_src
      let durasi = shortcode_media.video_duration
      let uploader = shortcode_media.owner.username
      let caption = shortcode_media.edge_media_to_caption.edges[0].node
      let obj = {
        vid,
        thumb,
        durasi,
        uploader,
        caption,
      }
      return obj
    } else {
      let uploader = shortcode_media.owner.username
      let thumb = shortcode_media.display_resources
      let caption = shortcode_media.edge_media_to_caption.edges[0].node
      let obj = {
        thumb,
        uploader,
        caption,
      }
      return obj
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
