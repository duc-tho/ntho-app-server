const { AnimgController } = require("../controllers/animg.control");
const { TiktokController } = require("../controllers/tiktok.control");
const { WebPushController } = require("../controllers/web-push.control");
const { AuthController } = require("../controllers/auth.control");
const { TokenCheckMiddlaware } = require("../middlewares/token-check.middlaware");
const { HistoryValidate } = require("./validate/history.validate");
const {PaginationMiddleware} = require("../middlewares/pagination.middleware");
const path = require('path');
const fs = require('fs');
const { models: { User, DeviceToken, ChangeLog, Status, Profile }, models } = require("../core/database");

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
    this.fastify.get("/api/test", {}, async (req, res) => {
      let result = await User.findAll({
        where: {
          id: '20aa5704-3376-4058-ae6c-65ee6ae55fc2'
        },
        attributes: {
          exclude: ['password']
        },
        include: [
          // {
          //   model: Profile,
          //   required: true,
          //   attributes: {
          //     exclude: ['UserId', 'id']
          //   }
          // },
          {
            model: Status,
            required: true,
            attributes: ['created_at', 'updated_at', 'deleted_at'],
            where: {
              deleted_at: null
            }
          },
          {
            model: ChangeLog,
            attributes: [ 'created_at'],
            required: true,
            nest: true
          },
        ]
      });

      let user = await DeviceToken.findOne({
        where: {
          id: '3d51445c-4198-48ce-a849-625cf2467f78'
        }
      });


      user.token = 'ádfasdfasdfasfasfasfasdfasdfasdf';

      user.save();

      res.send(result);
    });
  }
}

exports.router = Index