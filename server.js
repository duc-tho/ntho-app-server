/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const axios = require("axios");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

//fastify.register(require("@fastify/cors"), {
// put your options here
//  origin: "*",
//});
//**
// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

fastify.register(require("fastify-cors"), {
  // put your options here
  origin: "*",
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/api/tiktok", function (request, reply) {
  let tiktokUrl = request.query("url");

  if (!tiktokUrl) {
    reply.statusCode = 400;
    return reply.send({
      success: false,
      reson: "url parameter is require",
    });
  }

  axios
    .get("https://api.douyin.wtf/api?url=https://vt.tiktok.com/ZSdQa9db3/?k=1")
    .then((res) => {
      //console.log(res);
      reply.send(res.data);
    });
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
