const { db } = require("../core/db");

exports.webpushController = {
  push: (req, rep) => {
    db.get("pushTokens").then((data) => {
      let deviceTokens = Object.values(data.val());

      if (deviceTokens.length <= 0)
        rep.send({
          success: true,
          reason: "Chưa có thiết bị nào",
        });

      const finalDeviceTokens = deviceTokens.filter(
        (deviceToken, index, self) => self.indexOf(deviceToken) === index
      );

      console.log(finalDeviceTokens);

      rep.send({
        success: true,
        reason: "Send success thành công",
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
        rep.send({
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
