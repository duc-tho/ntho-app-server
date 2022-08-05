const akaneko = require("akaneko");
const neko = new (require("nekos.life"))();
const { SFW_TYPES, NSFW_TYPES, DEFAULT_ANIMG_URL } = require('../core/constants/Animg');

class AnimgController {
  async getImageUrl(req, rep) {
    let url = DEFAULT_ANIMG_URL;
    let allowNsfw = req.query["allowNsfw"];
    let types = allowNsfw ? SFW_TYPES.concat(NSFW_TYPES) : SFW_TYPES;
    let randomTypeIndex = Math.floor(Math.random() * types.length);
    let selectedType = types[randomTypeIndex];
    let selectedTypeInfo = {
      module: selectedType.split(".")[0],
      moduleType: selectedType.split(".")[1],
      imageType: selectedType.split(".")[2],
    };

    try {
      switch (selectedTypeInfo.module) {
        case "aka":
          if (
            selectedTypeInfo.moduleType === "sfw" &&
            typeof akaneko[selectedTypeInfo.imageType] == "function"
          ) url = await akaneko[selectedTypeInfo.imageType]();

          if (
            selectedTypeInfo.moduleType === "nsfw" &&
            typeof akaneko.NSFW_TYPES[selectedTypeInfo.imageType] == "function"
          ) url = await akaneko.NSFW_TYPES[selectedTypeInfo.imageType]();

          break;

        case "neko":
          if (typeof neko[selectedTypeInfo.imageType] == "function")
            url = (await neko[selectedTypeInfo.imageType]())['url'] ?? url;

          break;
      }

      if (url.split(' ').length > 1) url = url.split(' ')[0];
      return rep.send(url);
    } catch (e) {
      console.error(e);
      rep.send(url);
    }
  }
}

exports.AnimgController = new AnimgController();