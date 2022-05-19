const path = require("path");
const axios = require("axios");

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

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

let verifyUrl = (url) => {
  let urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

  let isUrlValid = url.match(urlRegex) ? true : false;

  let domainRegex =
    /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
  let domain = url.match(domainRegex)[0];
  let isDomainValid = false;

  switch (domain) {
    case "vt.tiktok.com":
    case "tiktok.com":
    case "www.tiktok.com":
    case "www.vt.tiktok.com":
      isDomainValid = true;
      break;
    default:
      break;
  }

  if (isUrlValid && isDomainValid) return true;
  else return false;
};

fastify.get("/api/tiktok", function (request, reply) {
  let tiktokUrl = request.query["url"];

  if (!tiktokUrl) {
    reply.statusCode = 400;
    return reply.send({
      success: false,
      reason: "Url parameter is require!",
    });
  }

  if (!verifyUrl(tiktokUrl)) {
    reply.statusCode = 400;
    return reply.send({
      success: false,
      reason: "Url not valid!",
    });
  }

  axios.get(`https://api.douyin.wtf/api?url=${tiktokUrl}`).then((res) => {
    reply.send(res.data);
  });
});

fastify.listen(process.env.PORT, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
