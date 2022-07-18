const { tiktokController } = require("./controllers/tiktok.control");
const { tiktokHistoryController } = require("./controllers/tiktok-history.control");
const { db } = require('./core/db');

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("api/history", {}, function (req, rep) {
            db.get('histories').then(data => rep.send(data.val()));
          });
       
          // this.fastify.post("api/history", {}, tiktokHistoryController.save);
     } 
}

exports.router = Router