const akaneko = require("akaneko");
const neko = new require('nekos.life')();

exports.animeImageController = async (req, rep) => {
  let sfw = ["neko", "lewdNeko", "lewdBomb", "wallpapers", "mobileWallpapers"];
  let nsfw = [
    "cum",
    "doujin",
    "femdom",
    "hentai",
    "maid",
    "maids",
    "orgy",
    "panties",
    "wallpapers",
    "mobileWallpapers",
    "cuckold",
    "netorare",
    "gifs",
    "gif",
    "blowjob",
    "feet",
    "pussy",
    "uglyBastard",
    "uniform",
    "gangbang",
    "foxgirl",
    "cumslut",
    "glasses",
    "thighs",
    "tentacles",
    "masturbation",
    "school",
    "yuri",
    "zettaiRyouiki",
    "succubus",
  ];
  let allowNsfw = req.query["allowNsfw"];
  let types = allowNsfw ? sfw.concat(nsfw) : sfw;
  let randomTypeIndex = Math.floor(Math.random() * types.length + 1);
  let randomType = types[randomTypeIndex];

  try {
   if (typeof akaneko[randomType] == "function") {
    let url = await akaneko[randomType]();
    return rep.send(url);
  }

  if (typeof akaneko.nsfw[randomType] == "function") {
    let url = await akaneko.nsfw[randomType]();
    return rep.send(url);
  }   
  } catch {
    rep.send('https://64.media.tumblr.com/a186a898675f408b2a6b4bca5243744e/tumblr_ppwlhaQHuA1vqi0muo1_400.gifv')
  }
};
