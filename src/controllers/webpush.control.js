const { db } = require("../core/db");
const { default: axios } = require("axios");

exports.webpushController = {
  push: (req, rep) => {
    db.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val());

      if (deviceTokens.length <= 0)
        return rep.send({
          success: true,
          reason: "Chưa có thiết bị nào",
        });

      const finalDeviceTokens = deviceTokens.filter(
        (deviceToken, index, self) => self.indexOf(deviceToken) === index
      );

      const pushData = JSON.stringify({
        registration_ids: finalDeviceTokens,
        notification: {
          title: 'test',
          body: 'test content',
        },
      });

      axios({
        method: "POST",
        url: `https://fcm.googleapis.com//v1/projects/${process.env.PROJECT_ID}/messages:send`,
        headers: {
          Authorization: `Bearer key=${process.env.FIREBASE_SERVER_KEY ? process.env.FIREBASE_SERVER_KEY : ''}`,
          "Content-Type": "application/json",
        },
        data: pushData
      })
        .then((res) => {
          rep.send({
            success: true,
            reason: "Send push noti thành công",
          });
        })
        .catch((err) => {
          rep.send({
            success: false,
            reason: "Gửi push noti thất bại",
          });
        });
    });
  },

  saveDeviceToken: (req, rep) => {
    if (!req.body.deviceToken)
      rep.send({
        success: false,
        reason: "Không có token sao mà lưu :<",
      });

    db.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val());

      if (deviceTokens.includes(req.body.deviceToken))
        return rep.send({
          success: false,
          reason: "Token đã tồn tại!",
        });

      db.set("pushTokens", req.body.deviceToken);

      rep.send({
        success: true,
        reason: "Lưu thành công",
      });
    });
  },
};
