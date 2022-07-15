const { tiktokController } = require("./controllers/tiktok.control");
const { db } = require('./core/db');

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/test", {}, (req, res) => {
              console.log(db.get('histories'));
            
              res.send("done"); 
          })
     }
}

exports.router = Router