const { tiktokController } = require("./controllers/tiktok.control");
const { db } = require('./core/db');
const { get, child, ref, onValue } = require("firebase/database");

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/test", {}, (req, res) => {
              get(ref(db, `history/0QcnVQx1UunlrSbL9ehr`)).then((snapshot) => {
                  console.log(snapshot.val());
              }).catch((error) => {
                  console.log(error);
              });
            
              res.send('asdf');
          })
     }
}

exports.router = Router