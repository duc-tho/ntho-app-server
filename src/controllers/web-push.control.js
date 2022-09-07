const {default: axios} = require("axios");
const {GoogleAuth} = require("../core/google-auth");
const {Response} = require("../core/response");
const {models: {DeviceToken}} = require("../core/database");
const {Op} = require("sequelize");

class WebPushControl {
  async push(req, rep) {
    let googleAuthJWTAccessToken = await GoogleAuth.getJWTAccessToken();
    let sendPromises = [];
    let sendSuccess = 0;
    
    if (!req.body || !req.body.title || !req.body.body)
      return Response.send(400, 'Chưa có nội dung noti', rep);

    let deviceTokens = await DeviceToken.findAll({
      where: {
        UserId: {
          [Op.not]: req.data.userId
        }
      },
      attributes: ['token']
    });
    
    if (deviceTokens.length === 0) return Response.send(400, 'Chưa có thiết bị nào', rep);

    // Remove duplicate if have
    const uniqueDeviceTokens = deviceTokens.filter((deviceToken, index, self) => self.indexOf(deviceToken) === index);

    uniqueDeviceTokens.forEach((deviceToken) => {
      const pushData = JSON.stringify({
        message: {
          token: deviceToken.token,
          notification: {
            title: req.body.title ?? "Chưa có title",
            body: req.body.body ?? "Trống",
          },
        },
      });

      sendPromises.push(
        axios({
          method: "POST",
          url: `https://fcm.googleapis.com/v1/projects/${process.env.PROJECT_ID}/messages:send`,
          headers: {
            Authorization: `Bearer ${googleAuthJWTAccessToken}`,
            "Content-Type": "application/json",
          },
          data: pushData,
        })
          .then(() => sendSuccess += 1)
          .catch((e) => console.error(e.message))
      )
    });
    
    await Promise.all(sendPromises);
  
    if (sendSuccess) return Response.send(200, `Send push noti thành công tới ${sendSuccess} thiết bị`, rep);
    else return Response.send(400, 'Send push noti thất bại', rep);
  }

  async saveDeviceToken(req, rep) {
    const {deviceToken} = req.body;

    let isTokenExists = !!(await DeviceToken.findOne({
      where: {
        token: deviceToken
      },
      attributes: ['token']
    }));

    if (isTokenExists) return Response.send(400, 'Token đã tồn tại!', rep);

    DeviceToken.create({
      UserId: req.data.userId,
      token: req.body.deviceToken
    }).then(() => Response.send(200, 'Lưu device token thành công', rep))
      .catch((e) => {
        console.log(e);
        Response.send(500, 'Lưu device token thất bại', rep)
      });
  }
}

exports.WebPushController = new WebPushControl();