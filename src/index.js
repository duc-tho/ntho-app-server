require('dotenv').config();
require('./models');
const path = require('path');
const { Response } = require("./core/response");
const fastify = require("fastify")({
  logger: false,
});

fastify.register(require('fastify-compression'));

fastify.register(require("@fastify/static"), {
  root: path.resolve(__dirname, "../public")
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    return Response.send(422, `<${error.validationContext}> không hợp lệ!`, reply)
  } else {
    return Response.send(500, error.message, reply)
  }
});

exports.fastify = fastify; 