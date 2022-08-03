const akaneko = require("akaneko");

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

  if (typeof akaneko[randomType] == "function") {
    let url = await akaneko[randomType]();
    return rep.send(url);
  }

  if (typeof akaneko.nsfw[randomType] == "function") {
    let url = await akaneko.nsfw[randomType]();
    return rep.send(url);
  }
};
