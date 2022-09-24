const { verifyUrl, getIdFromUrl } = require("../core/url");
const { default: axios } = require("axios");
const { Response } = require('../core/response');
const { models: { History, Status, Profile, User } } = require('../core/database');
const { STATUS_CODE } = require("../core/constants/Code");

class TiktokControl {
  async download(request, reply) {
    let tiktokUrl = request.query["url"];

    if (!tiktokUrl) return Response.send(STATUS_CODE.NOT_FOUND, 'Chưa nhập link', reply);

    let domain = verifyUrl(tiktokUrl)[0];

    if (!domain) return Response.send(STATUS_CODE.NOT_FOUND, 'Link không hợp lệ', reply);

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

    if (!id) return Response.send(STATUS_CODE.NOT_FOUND, 'Không thể lấy dữ liệu video!', reply);

    axios.get(`https://api.douyin.wtf/api?url=${tiktokUrl}`).then((response) => {
      return reply.send({
        'status': 'success',
        'url_type': 'video',
        'video_title': response.data["video_title"],
        'nwm_video_url': response.data["nwm_video_url"],
        'wm_video_url': response.data["wm_video_url"] || 'None',
      });
    }).catch(e => {
      console.log(e);
      return Response.send(STATUS_CODE.NOT_FOUND, 'Không thể lấy dữ liệu video! Có thể là lỗi api tiktok', reply);
    });
  }

  getHistory(req, rep) {
    History.findAll({
      offset: req.pagination.offset,
      limit: req.pagination.limit,
      where: {
        type: 'tiktok'
      },
      attributes: {
        exclude: ['type']
      },
      order: [
        [
          {
            model: Status,
          },
          'created_at',
          'DESC'
        ],
      ],
      include: [
        {
          model: Status,
          required: true,
          attributes: ['created_at'],
          where: {
            deleted_at: null
          }
        },
        {
          model: User,
          required: true,
          include: [
            {
              model: Profile,
              required: true,
            }
          ],
        }
      ]
    }).then(histories => {
      rep.send(histories)
    });
  }

  saveHistory(req, rep) {
    if (!req.body) return Response.send(STATUS_CODE.NOT_FOUND, 'Hong có dữ liệu lịch sử để lưu', rep);
    const { nwm, title, wm, url } = req.body;

    const historyData = {
      UserId: req.data.userId,
      type: 'tiktok',
      data: JSON.stringify({ title, nwm, wm, url })
    }

    History.create(historyData)
      .then(history => Response.send(STATUS_CODE.OK, 'Lưu thành công', rep))
      .catch(err => Response.send(STATUS_CODE.NOT_FOUND, 'Lưu thất bại', rep));
  }
}

exports.TiktokController = new TiktokControl();