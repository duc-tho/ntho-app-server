const { tiktokController } = require("./controllers/tiktok.control");
const { db } = require('./core/db');

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/history", {}, (req, res) => {
              db.get('histories', 0).then(data => console.log(data.val()));
            
              res.send("done"); 
          })
     }
}

exports.router = Router