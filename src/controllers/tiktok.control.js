const { verifyUrl, getIdFromUrl, getOriginUrl } = require("../core/url");
const { default: axios } = require("axios");
exports.tiktokController = async function (request, reply) {
  let tiktokUrl = request.query["url"];

  if (!tiktokUrl) {
    reply.statusCode = 400;
    return reply.send({
      success: false,
      reason: "Chưa nhập Link",
    });
  }

  let domain = verifyUrl(tiktokUrl)[0];

  if (!domain) {
    reply.statusCode = 400;
    return reply.send({
      success: false,
      reason: "Link không hợp lệ!",
    });
  }

  let id = await getIdFromUrl(tiktokUrl);

  if (id === 0 && ((domain === 'vt.tiktok.com') || (domain === 'www.vt.tiktok.com'))) {
    await axios({
      method: 'GET',
      url: tiktokUrl,
      maxRedirects: 0,
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.66",
      }
    }).catch(e => tiktokUrl = e.response.headers.location);

    id = getIdFromUrl(tiktokUrl)
  }

  if (!id) return reply.send({
    success: false,
    reason: "Không thể lấy dữ liệu video!",
  });

  axios.get(`https://api.tiktokv.com/aweme/v1/aweme/detail/?aweme_id=${id}`).then((response) => {
    reply.send({
      'status': 'success',
      'url_type': 'video',
      'video_title': response.data["aweme_detail"]["desc"],
      'nwm_video_url': response.data["aweme_detail"]["video"]["play_addr"]["url_list"][0],
      'wm_video_url': response.data["aweme_detail"]["video"]['download_addr']['url_list'][0] || 'None',
    });
  }).catch(e => {
    console.log(e);
    reply.send({
      success: false,
      reason: "Không thể lấy dữ liệu video! Có thể là lỗi api tiktok",
    })
  });
}