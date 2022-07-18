const { db } = require('../core/db');

exports.tiktokHistoryController = {
  get: (req, rep) => {
    db.get('histories').then(data => rep.send(data.val()));
  },
  
  save: (req, rep) => {
    if (!req.body) rep.send({
          success: false,
          reason: 'Hong có dữ liệu lịch sử để lưu',
     });
    
    db.set('histories', req.body);
    
    rep.send({
          success: true,
          reason: 'Lưu thành công',
     });
  }
}