const akaneko = require('akaneko');

exports.animeImageController = async (req, rep) => {
    let url = await akaneko.nsfw.cum();
    
    rep.send(url);
}