module.exports = {
  response: async function (req, res, path) {
    if (path !== req.originalUrl && path + "/" !== req.originalUrl) {
      return res.sendStatus(404);
    }
    try {
      const obj = {
        vboxInfo: "*",
      };
      require("../helper/responseHelper.js").response(req, res, obj);
    } catch (e) {
      if (!e) return;
      console.error(e);
      res.sendStatus(500);
    }
  },
};
