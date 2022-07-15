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
              db.ref(`history/0QcnVQx1UunlrSbL9ehr`).once("value").then((snapshot) => {
                  console.log(snapshot.val());
              }).catch((error) => {
                  console.log(error);
              });
            
              res.send('asdf'); 
          })
     }
}

exports.router = Router