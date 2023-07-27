module.exports = {
  netConn: async function (req, res, url) {
    try {
      const si = require('systeminformation')
      si.inetChecksite(url).then((data) =>
        JSON.stringify(data, (key, value) => {
          res.set('Content-Type', 'application/json')
          res.json(value)
        })
      )
    } catch (e) {
      if (!e) return
      console.error(e)
      res.sendStatus(500)
    }
  },
  netLatency: async function (req, res, url) {
    try {
      const si = require('systeminformation')
      si.inetLatency(url).then((data) =>
        JSON.stringify(data, (key, value) => {
          res.set('Content-Type', 'application/json')
          res.json(value)
        })
      )
    } catch (e) {
      if (!e) return
      console.error(e)
      res.sendStatus(500)
    }
  }
}
