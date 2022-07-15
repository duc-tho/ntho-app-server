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
              let a = ref(db, `history/0QcnVQx1UunlrSbL9ehr`);
            
              get(a).then(() => console.log('asdfasfas'));
              res.send("done"); 
          })
     }
}

exports.router = Router