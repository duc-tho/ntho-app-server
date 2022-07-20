const { db } = require('../core/db');

exports.webpushController = {
  push: (req, rep) => {
    rep.send("pút");
  },
  
  saveDeviceToken: (req, rep) => {
    if (!req.body.deviceToken) rep.send({
          success: false,
          reason: 'Không có token sao mà lưu :<',
     });
    
    db.set('pushTokens', req.body.deviceToken);
    
    rep.send({
          success: true,
          reason: 'Lưu thành công',
     });
  }
}