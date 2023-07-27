module.exports = {
  response: async function (req, res, obj) {
    const si = require('systeminformation')
    try {
      si.get(obj).then((data) =>
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
