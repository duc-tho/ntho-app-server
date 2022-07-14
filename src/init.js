const path = require('path');

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