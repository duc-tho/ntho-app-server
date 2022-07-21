const { db, getToken, messenging } = require("../core/db");
const { default: axios } = require("axios");

exports.webpushController = {
  push: async (req, rep) => {
    let accessToken = await getToken();

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
        message: {
          topic: "matchday",
          notification: {
            title: "Background Message Title",
            body: "Background message body",
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

      const registrationTokens = [
        "YOUR_REGISTRATION_TOKEN_1",
        // ...
        "YOUR_REGISTRATION_TOKEN_n",
      ];

      // Subscribe the devices corresponding to the registration tokens to the
      // topic.
      messaging
        .subscribeToTopic(registrationTokens, topic)
        .then((response) => {
          // See the MessagingTopicManagementResponse reference documentation
          // for the contents of response.
          console.log("Successfully subscribed to topic:", response);
        })
        .catch((error) => {
          console.log("Error subscribing to topic:", error);
        });

      db.set("pushTokens", req.body.deviceToken);

      rep.send({
        success: true,
        reason: "Lưu thành công",
      });
    });
  },
};
