const path = require('path');
const fs = require('fs');
const { AnimgController } = require("../controllers/animg.control");
const { TiktokController } = require("../controllers/tiktok.control");
const { WebPushController } = require("../controllers/web-push.control");
const { AuthController } = require("../controllers/auth.control");
const { TokenCheckMiddlaware } = require("../middlewares/token-check.middlaware");
const { HistoryValidate } = require("./validate/history.validate");
const { PaginationMiddleware } = require("../middlewares/pagination.middleware");
const { DeviceTokenValidate } = require("./validate/device-token.validate");
const { ProfileController } = require("../controllers/profile.control");
const { ProfileValidate } = require("./validate/profile.validate");
const { NoteController } = require("../controllers/note.control");
const { NoteValidate } = require("./validate/note.validate");

class Index {
  constructor(fastify) {
    this.fastify = fastify;
  }

  init() {
    this.fastify.addHook('onRequest', PaginationMiddleware.index);

    this.fastify.get("/", {}, (req, res) => res.send('Api is running :3'));
    this.fastify.get("/keep-active", {}, (req, res) => res.send('Re-active :D'));
    this.fastify.get("/db", {}, (req, res) => {
      const src = path.resolve(__dirname + '../../data/ntho.db');
      const dest = path.resolve(__dirname + '../../../public/ntho.db');

      fs.copyFile(src, dest, (err) => {
        if (err) return res.send('fail');

        return res.send('success');
      });
    });

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
    this.fastify.post("/api/save-device-token", {
      preHandler: TokenCheckMiddlaware.verify,
      schema: DeviceTokenValidate.getSchemaForCreate()
    }, WebPushController.saveDeviceToken);

    this.fastify.post("/api/send-noti-to-device", {
      preHandler: TokenCheckMiddlaware.verify,
    }, WebPushController.push);

    // Anime image
    this.fastify.get("/api/animg", {}, AnimgController.getImageUrl);

    // Auth
    this.fastify.post("/api/register", {}, AuthController.register);
    this.fastify.post("/api/login", {}, AuthController.login);
    this.fastify.post("/api/refresh", {}, AuthController.refresh);

    // Profile
    this.fastify.post("/api/profile", {
      preHandler: TokenCheckMiddlaware.verify,
      schema: ProfileValidate.getSchemaForRead()
    }, ProfileController.get);

    this.fastify.put("/api/profile", {
      preHandler: TokenCheckMiddlaware.verify
    }, ProfileController.update);

    // Note
    this.fastify.post("/api/notes", {
      preHandler: TokenCheckMiddlaware.verify,
      // schema: NoteValidate.getSchemaForRead()
    }, NoteController.getAll);

    this.fastify.post("/api/note/:id", {
      preHandler: TokenCheckMiddlaware.verify,
      // schema: NoteValidate.getSchemaForRead()
    }, NoteController.get);

    this.fastify.post("/api/note", {
      preHandler: TokenCheckMiddlaware.verify,
      schema: NoteValidate.getSchemaForCreate()
    }, NoteController.create);

    this.fastify.put("/api/note", {
      preHandler: TokenCheckMiddlaware.verify,
      schema: NoteValidate.getSchemaForCreate()
    }, NoteController.update);
  }
}

exports.router = Index