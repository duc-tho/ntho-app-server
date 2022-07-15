const { tiktokController } = require("./controllers/tiktok.control");
const { db } = require('./core/db');
const { get, child, ref, onValue, getDatabase } = require("firebase/database");

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/test", {}, (req, res) => {
              let history = ref(db, `histories`);
            
              get(history).then((sn) => {
                  console.log(sn.val());
              });
            
              res.send("done"); 
          })
     }
}

exports.router = Router