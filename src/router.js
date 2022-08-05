const { tiktokController } = require("./controllers/tiktok.control");
const { tiktokHistoryController } = require("./controllers/tiktok-history.control");
const { webpushController } = require("./controllers/webpush.control");
const { animeImageController } = require("./controllers/anime-image.control");

class Router {
  constructor(fastify) {
    this.fastify = fastify;
  }

  init() {
    this.fastify.get("/api/tiktok", {}, tiktokController);

    this.fastify.get("/api/history", {}, tiktokHistoryController.get);

    this.fastify.post("/api/history", {}, tiktokHistoryController.save);

    this.fastify.post("/api/savenoti", {}, webpushController.saveDeviceToken);

    this.fastify.post("/api/pushnoti", {}, webpushController.push);

    this.fastify.get("/api/animg", {}, animeImageController);

    this.fastify.get("/", {}, (req, res) => res.send('Api is running :3'));

    this.fastify.get("/keep-active", {}, (req, res) => res.send('Re-active :D'));
  }
}

exports.router = Router