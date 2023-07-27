module.exports = {
  response: async function (req, res) {
    try {
      if (
        req.originalUrl === "/api/network" ||
        req.originalUrl === "/api/network/"
      ) {
        const obj = {
          networkInterfaces: "*",
          networkInterfaceDefault: "*",
          networkGatewayDefault: "*",
          networkStats: "*",
          networkConnections: "*",
        };
        require("../helper/responseHelper.js").response(req, res, obj);
      } else if (req.originalUrl === "/api/network/wifi") {
        const obj = {
          wifiNetworks: "*",
          wifiInterfaces: "*",
          wifiConnections: "*",
        };
        require("../helper/responseHelper.js").response(req, res, obj);
      } else if (req.originalUrl.startsWith("/api/network/conn?s=")) {
        const url = req.query.s;
        require("../helper/netHelper.js").netConn(req, res, url);
      } else if (req.originalUrl.startsWith("/api/network/ping?s=")) {
        const url = req.query.s;
        require("../helper/netHelper.js").netLatency(req, res, url);
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
