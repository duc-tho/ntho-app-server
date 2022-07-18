const { tiktokController } = require("./controllers/tiktok.control");
const { tiktokHistoryController } = require("./controllers/tiktok-history.control");

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/api/history", {}, tiktokHistoryController.get);
       
          this.fastify.post("/api/history", {}, tiktokHistoryController.save);
     } 
}

exports.router = Router