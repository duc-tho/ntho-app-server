const { default: axios } = require("axios");

exports.verifyUrl = (url) => {
     let urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
     let domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
     let isUrlValid = url.match(urlRegex) ? true : false;
     let domain = url.match(domainRegex);
     let isDomainValid = false;

     if (domain) {
          switch (domain[0]) {
               case "vt.tiktok.com":
               case "tiktok.com":
               case "www.tiktok.com":
               case "www.vt.tiktok.com":
                    isDomainValid = true;
                    break;
               default:
                    break;
          }
     }

     if (isUrlValid && isDomainValid) return domain;

     return false;
};

exports.getOriginUrl = (url) => axios({
     method: 'GET',
     url: url,
     maxRedirects: 0,
     headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.66",
     }
});

exports.getIdFromUrl = (url) => {
     let idMatch = url.match(/video\/\d+/gm);

     if (!idMatch) return 0000000000000000000;

     return idMatch[0].split('/')[1];
};