const path = require('path');
const { db } = require('./core/db');
const { ref, set } = require("firebase/database");

set(ref(db, 'users/' + 1), {
  username: "Tho",
  email: "Tho dut",
});

const fastify = require("fastify")({
     logger: false,
});

fastify.register(require("fastify-static"), {
     root: path.join(__dirname, "public"),
     prefix: "/",
});

fastify.register(require("fastify-formbody"));

fastify.register(require("point-of-view"), {
     engine: {
          handlebars: require("handlebars"),
     },
});

fastify.register(require("fastify-cors"), {
     origin: "*",
});

exports.fastify = fastify;