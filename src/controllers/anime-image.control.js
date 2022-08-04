const akaneko = require("akaneko");
const neko = new (require("nekos.life"))();

exports.animeImageController = async (req, rep) => {
  let sfw = [
    "aka.sfw.neko",
    "aka.sfw.lewdNeko",
    "aka.sfw.lewdBomb",
    "aka.sfw.wallpapers",
    "aka.sfw.mobileWallpapers",
    "neko.sfw.tickle",
    "neko.sfw.slap",
    "neko.sfw.poke",
    "neko.sfw.pat",
    "neko.sfw.neko",
    "neko.sfw.meow",
    "neko.sfw.lizard",
    "neko.sfw.kiss",
    "neko.sfw.hug",
    "neko.sfw.foxGirl",
    "neko.sfw.feed",
    "neko.sfw.cuddle",
    "neko.sfw.why",
    "neko.sfw.catText",
    "neko.sfw.OwOify",
    "neko.sfw.eightBall",
    "neko.sfw.fact",
    "neko.sfw.nekoGif",
    "neko.sfw.kemonomimi",
    "neko.sfw.holo",
    "neko.sfw.smug",
    "neko.sfw.baka",
    "neko.sfw.woof",
    "neko.sfw.spoiler",
    "neko.sfw.wallpaper",
    "neko.sfw.goose",
    "neko.sfw.gecg",
    "neko.sfw.avatar",
    "neko.sfw.waifu",
  ];

  let nsfw = [
    "aka.nsfw.cum",
    "aka.nsfw.doujin",
    "aka.nsfw.femdom",
    "aka.nsfw.hentai",
    "aka.nsfw.maid",
    "aka.nsfw.maids",
    "aka.nsfw.orgy",
    "aka.nsfw.panties",
    "aka.nsfw.wallpapers",
    "aka.nsfw.mobileWallpapers",
    "aka.nsfw.cuckold",
    "aka.nsfw.netorare",
    "aka.nsfw.gifs",
    "aka.nsfw.gif",
    "aka.nsfw.blowjob",
    "aka.nsfw.feet",
    "aka.nsfw.pussy",
    "aka.nsfw.uglyBastard",
    "aka.nsfw.uniform",
    "aka.nsfw.gangbang",
    "aka.nsfw.foxgirl",
    "aka.nsfw.cumslut",
    "aka.nsfw.glasses",
    "aka.nsfw.thighs",
    "aka.nsfw.tentacles",
    "aka.nsfw.masturbation",
    "aka.nsfw.school",
    "aka.nsfw.yuri",
    "aka.nsfw.zettaiRyouiki",
    "aka.nsfw.succubus"
  ];

  let allowNsfw = req.query["allowNsfw"];
  let types = allowNsfw ? sfw.concat(nsfw) : sfw;
  let randomTypeIndex = Math.floor(Math.random() * types.length + 1);
  let selectedType = types[randomTypeIndex];
  let selectedTypeInfo = {
    module: selectedType.split(".")[0],
    moduleType: selectedType.split(".")[1],
    imageType: selectedType.split(".")[2],
  };
  console.log(await neko.nsfw.pussyWankGif())
  try {
    let url =
      "https://64.media.tumblr.com/a186a898675f408b2a6b4bca5243744e/tumblr_ppwlhaQHuA1vqi0muo1_400.gifv";

    switch (selectedTypeInfo.module) {
      case "aka":
        if (
          selectedTypeInfo.moduleType === "sfw" &&
          typeof akaneko[selectedTypeInfo.imageType] == "function"
        )
          url = await akaneko[selectedTypeInfo.imageType]();

        if (
          selectedTypeInfo.moduleType === "nsfw" &&
          typeof akaneko.nsfw[selectedTypeInfo.imageType] == "function"
        )
          url = await akaneko.nsfw[selectedTypeInfo.imageType]();

        rep.send(url);
        break;
      case "neko":
        if (
          selectedTypeInfo.moduleType === "sfw" &&
          typeof neko[selectedTypeInfo.imageType] == "function"
        )
          neko.sfw[selectedTypeInfo.imageType]().then((retUrl) =>
            console.log(retUrl)
          );

        if (
          selectedTypeInfo.moduleType === "nsfw" &&
          typeof neko[selectedTypeInfo.imageType] == "function"
        )
          neko.nsfw[selectedTypeInfo.imageType]().then((retUrl) =>
            console.log(retUrl)
          );

        break;
    }
  } catch (e) {
    console.error(e);
    rep.send(
      "https://64.media.tumblr.com/a186a898675f408b2a6b4bca5243744e/tumblr_ppwlhaQHuA1vqi0muo1_400.gifv"
    );
  }
};
