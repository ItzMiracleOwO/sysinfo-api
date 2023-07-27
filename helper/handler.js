module.exports = {
  handle: async function (req, res) {
    const fs = require('node:fs')
    const apiPath = './api'

    const reqPath = req.originalUrl.split('/').slice(2)[0].toString() + '.js'

    console.log('Recieved API Call for ' + `${reqPath}`)
    try {
      await fs.readdir(apiPath, function (err, files) {
        if (err) {
          console.log('Unable to scan directory: ' + err)
          return
        }

        const fileNames = files.filter((file) =>
          fs.statSync(`${apiPath}/${file}`).isFile()
        )

        if (fileNames.indexOf(reqPath) === -1) return res.sendStatus(404)

        let localAPIPath =
          '/' +
          require('path')
            .relative(require('path').join(__dirname, '..'), 'api/' + reqPath)
            .replace('\\', '/')
            .replace('.js', '')

        if (localAPIPath.endsWith('/')) {
          localAPIPath = localAPIPath.slice(0, -1)
        }

        require(`../api/${reqPath}`).response(req, res, localAPIPath)
      })
    } catch (e) {
      if (!e) console.error(e)
    }
  }
}
