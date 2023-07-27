module.exports = {
  response: async function (req, res) {
    try {
      if (
        req.originalUrl === "/api/docker" ||
        req.originalUrl === "/api/docker/"
      ) {
        const obj = {
          dockerInfo: "*",
          dockerImages: "*",
          dockerContainers: "*",
          dockerContainerStats: "*",
          dockerContainerProcesses: "*",
          dockerVolumes: "*",
        };
        require("../helper/responseHelper.js").response(req, res, obj);
      } else if (
        req.originalUrl === "/api/docker/all" ||
        req.originalUrl === "/api/docker/all/"
      ) {
        const obj = {
          dockerAll: "*",
        };
        require("../helper/responseHelper.js").response(req, res, obj);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      if (!e) return;
      console.error(e);
      res.sendStatus(500);
    }
  },
};
