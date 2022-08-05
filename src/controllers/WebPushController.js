const { default: axios } = require("axios");
const { FirebaseDatabase } = require("../core/Firebase");
const { GoogleAuth } = require("../core/GoogleAuth");
const { Response } = require("../core/Response");

class WebpushController {
  async push(req, rep) {
    let accessToken = await GoogleAuth.getJWTAccessToken();

    if (!req.body || !req.body.title || !req.body.body)
      return Response.send(400, 'Chưa có nội dung noti', rep);

    FirebaseDatabase.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val() ?? []);

      if (deviceTokens.length <= 0)
        return Response.send(400, 'Chưa có thiết bị nào', rep);

      const finalDeviceTokens = deviceTokens.filter(
        (deviceToken, index, self) => self.indexOf(deviceToken) === index
      );

      finalDeviceTokens.forEach((deviceToken) => {
        const pushData = JSON.stringify({
          message: {
            token: deviceToken,
            notification: {
              title: req.body.title ?? "Chưa có title",
              body: req.body.body ?? "Trống",
            },
          },
        });

        axios({
          method: "POST",
          url: `https://fcm.googleapis.com//v1/projects/${process.env.PROJECT_ID}/messages:send`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: pushData,
        })
          .then(() => Response.send(200, 'Send push noti thành công', rep))
          .catch(() => Response.send(400, 'Gửi push noti thất bại', rep));
      });
    });
  }

  saveDeviceToken(req, rep) {
    if (!req.body.deviceToken)
      return Response.send(400, 'Không có token sao mà lưu :<', rep);

    FirebaseDatabase.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val() ?? []);

      if (deviceTokens.includes(req.body.deviceToken))
        return Response.send(400, 'Token đã tồn tại!', rep);

      FirebaseDatabase.set("pushTokens", req.body.deviceToken);

      return Response.send(200, 'Lưu device token thành công', rep);
    });
  }
}

exports.WebPushController = new WebpushController();