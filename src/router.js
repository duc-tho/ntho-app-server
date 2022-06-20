const { tiktokController } = require("./controllers/tiktok.control");

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
     }
}

exports.router = Router