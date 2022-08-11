const { AnimgController } = require("../controllers/animg.control");
const { TiktokController } = require("../controllers/tiktok.control");
const { WebPushController } = require("../controllers/web-push.control");
const { AuthController } = require("../controllers/auth.control");
const { TokenCheckMiddlaware } = require("../middlewares/token-check.middlaware");
const { HistoryValidate } = require("./validate/history.validate");
const {PaginationMiddleware} = require("../middlewares/pagination.middleware");

class Index {
  constructor(fastify) {
    this.fastify = fastify;
  }

  init() {
    this.fastify.addHook('onRequest', PaginationMiddleware.index);
    
    this.fastify.get("/", {}, (req, res) => res.send('Api is running :3'));
    this.fastify.get("/keep-active", {}, (req, res) => res.send('Re-active :D'));

    // Tiktok Downloader
    this.fastify.get("/api/tiktok", {}, TiktokController.download);
  
    // Tiktok History
    this.fastify.get("/api/history", {
      preHandler: TokenCheckMiddlaware.verify,
      beforeHandler: PaginationMiddleware.index,
      schema: HistoryValidate.getSchemaForRead()
    }, TiktokController.getHistory);
    
    this.fastify.post("/api/history", {
      preHandler: TokenCheckMiddlaware.verify,
      schema: HistoryValidate.getSchemaForCreate()
    }, TiktokController.saveHistory);

    // Web Push Notification
    this.fastify.post("/api/savenoti", {
      preHandler: TokenCheckMiddlaware.verify,
    }, WebPushController.saveDeviceToken);
    
    this.fastify.post("/api/pushnoti", {
      preHandler: TokenCheckMiddlaware.verify,
    }, WebPushController.push);
    
    // Anime image
    this.fastify.get("/api/animg", {}, AnimgController.getImageUrl);

    // Auth
    this.fastify.post("/api/register", {}, AuthController.register);
    this.fastify.post("/api/login", {}, AuthController.login);
    this.fastify.post("/api/refresh", {}, AuthController.refresh);
  }
}

exports.router = Index