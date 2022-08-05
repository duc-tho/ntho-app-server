const { AnimgController } = require("./controllers/AnimgController");
const { TiktokController } = require("./controllers/TiktokController");
const { WebPushController } = require("./controllers/WebPushController");

class Router {
  constructor(fastify) {
    this.fastify = fastify;
  }

  init() {
    this.fastify.get("/", {}, (req, res) => res.send('Api is running :3'));
    this.fastify.get("/keep-active", {}, (req, res) => res.send('Re-active :D'));

    this.fastify.get("/api/tiktok", {}, TiktokController.download);

    this.fastify.get("/api/history", {}, TiktokController.getHistory);
    this.fastify.post("/api/history", {}, TiktokController.saveHistory);

    this.fastify.post("/api/savenoti", {}, WebPushController.saveDeviceToken);
    this.fastify.post("/api/pushnoti", {}, WebPushController.push);
    
    this.fastify.get("/api/animg", {}, AnimgController.getImageUrl);
  }
}

exports.router = Router