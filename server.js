
const axios = require("axios");
const { fastify } = require('./src');
const { router } = require('./src/router.js');
const { RE_ACTIVE_TIME } = require('./src/core/constants/Common');

new router(fastify).init();

fastify.listen(process.env.PORT, "localhost", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});

setInterval(() => {
  axios.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/keep-active`)
    .then(() => console.log('Request keep active successfully!'))
    .catch(() => console.log('Request keep active failed!'));
}, RE_ACTIVE_TIME);
