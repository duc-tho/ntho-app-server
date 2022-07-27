const akaneko = require("akaneko");

exports.animeImageController = async (req, rep) => {
  let url = await akaneko.nsfw.cum();

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

  let random = Math.floor(Math.random() * 36);
  let type = sfw.concat(nsf)
  
  
  rep.send(url);
};
