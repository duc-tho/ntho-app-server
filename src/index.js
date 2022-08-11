require('dotenv').config();
require('./models');
const path = require('path');
const {sequelize} = require("./core/database");
const {Response} = require("./core/response");
const {PaginationMiddleware} = require("./middlewares/pagination.middleware");

const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
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
  console.log(error);
  if (error.validation) {
    return Response.send(422, `<${error.validationContext}> không hợp lệ!`, reply)
  } else {
    return Response.send(500, error.message, reply)
  }
})

// (async function () {
//   await sequelize.sync({ force: true });
//   console.log("All models were synchronized successfully.");
// })() 

exports.fastify = fastify; 