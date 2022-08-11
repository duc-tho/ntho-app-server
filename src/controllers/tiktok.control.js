const { verifyUrl, getIdFromUrl } = require("../core/url");
const { default: axios } = require("axios");
const { Response } = require('../core/response');
const { FirebaseDatabase } = require('../core/firebase');
const { models : { TiktokHistory } } = require('../core/database');

class TiktokControl {
  async download(request, reply) {
    let tiktokUrl = request.query["url"];

    if (!tiktokUrl) return Response.send(400, 'Chưa nhập link', reply);

    let domain = verifyUrl(tiktokUrl)[0];

    if (!domain) return Response.send(400, 'Link không hợp lệ', reply);

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

    if (!id) return Response.send(400, 'Không thể lấy dữ liệu video!', reply);

    axios.get(`https://api.tiktokv.com/aweme/v1/aweme/detail/?aweme_id=${id}`).then((response) => {
      return reply.send({
        'status': 'success',
        'url_type': 'video',
        'video_title': response.data["aweme_detail"]["desc"],
        'nwm_video_url': response.data["aweme_detail"]["video"]["play_addr"]["url_list"][0],
        'wm_video_url': response.data["aweme_detail"]["video"]['download_addr']['url_list'][0] || 'None',
      });
    }).catch(e => {
      console.log(e);
      return Response.send(400, 'Không thể lấy dữ liệu video! Có thể là lỗi api tiktok', reply);
    });
  }

  getHistory(req, rep) {
    TiktokHistory.findAll({
      attributes: ['id', 'UserId', "title", "url", "nwm", "createdAt"],
      offset: req.pagination.offset, 
      limit: req.pagination.limit,
      order: [
        ['createdAt', 'DESC']
      ],
    }).then(histories => {
      rep.send(histories)   
    });
  }

  saveHistory(req, rep) {
    if (!req.body) return Response.send(400, 'Hong có dữ liệu lịch sử để lưu', rep);
    const { nwm, title, wm, url } = req.body;
    
    const historyData = {
      UserId: req.data.userId,
      title, nwm, wm, url
    }
    
    TiktokHistory.create(historyData)
      .then(history => Response.send(200, 'Lưu thành công', rep))
      .catch(err => Response.send(400, 'Lưu thất bại', rep));
  }
}

exports.TiktokController = new TiktokControl();