const { tiktokController } = require("./controllers/tiktok.control");
const { db } = require('./core/db');
const { get, child, ref, onValue } = require("firebase/database");

class Router {
     constructor(fastify) {
          this.fastify = fastify;
     }

     init() {
          this.fastify.get("/api/tiktok", {}, tiktokController);
       
          this.fastify.get("/test", {}, (req) => {

get(ref(db, `history/0QcnVQx1UunlrSbL9ehr`)).then((snapshot) => {
  console.log('asdfasf');
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
          })
     }
}

exports.router = Router