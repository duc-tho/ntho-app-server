const { db, getToken, messenging } = require("../core/db");
const { default: axios } = require("axios");
const { getMessaging } = require("firebase/messaging");

exports.webpushController = {
  push: async (req, rep) => {
    let accessToken = await getToken();

    db.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val() ?? []);

      if (deviceTokens.length <= 0)
        return rep.send({
          success: true,
          reason: "Chưa có thiết bị nào",
        });

      const finalDeviceTokens = deviceTokens.filter(
        (deviceToken, index, self) => self.indexOf(deviceToken) === index
      );

      finalDeviceTokens.forEach((deviceToken) => {
        const pushData = JSON.stringify({
          message: {
            token: deviceToken,
            notification: {
              title: "Message Title",
              body: "Message body",
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
          .then((res) => {
            rep.send({
              success: true,
              reason: "Send push noti thành công",
            });
          console.log('success');
          })
          .catch((err) => {
            rep.send({
              success: false,
              reason: "Gửi push noti thất bại",
            });
          console.log('fail');
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
      let deviceTokens = Object.values(data.val() ?? []);

      if (deviceTokens.includes(req.body.deviceToken))
        return rep.send({
          success: false,
          reason: "Token đã tồn tại!",
        });

      console.log(deviceTokens);
      db.set("pushTokens", req.body.deviceToken);

      rep.send({
        success: true,
        reason: "Lưu thành công",
      });
    });
  },
};
