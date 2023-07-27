const express = require('express')

const reqHandler = require('./helper/handler.js')

const api = express()

api.set('json spaces', 4)

api.all('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) return
  reqHandler.handle(req, res)
})

api.listen(require("./config.js").listenPort, function () {
  console.log('Server is listening on port ' + require("./config.js").listenPort)
  require('systeminformation').currentLoad()
  require('systeminformation').fsStats()
  require('systeminformation').disksIO()
})

// Hot Fix: Systeminformation: Load between calls

// https://systeminformation.io/processes.html
// In currentLoad() the results are calculated correctly beginning with the second call of the function.
// It is determined by calculating the difference of cpu ticks between two calls of the function.
// The first time you are calling one of this functions, you will get the load since cpu uptime.
// The second time, you should then get statistics based on cpu ticks between the two calls.

setInterval(function () {
  require('systeminformation').currentLoad()
}, 1000)

// Hot Fix: Systeminformation: disksIO(), fsStats() results between calls

// https://systeminformation.io/filesystem.html
// In disksIO() and fsStats() the results / sec. values (rx_sec, IOPS, ...)
// are calculated correctly beginning with the second call of the function.
// It is determined by calculating the difference of transferred bytes / IOs divided by the time between two calls of the function.
// The first time you are calling one of this functions, you will get -1 for transfer rates.
// The second time, you should then get statistics based on the time between the two calls.

setInterval(function () {
  require('systeminformation').fsStats()
  require('systeminformation').disksIO()
}, 1000)

// Hot Fix: Systeminformation: networkStats() results between calls

// https://systeminformation.io/network.html
// In networkStats() the results / sec. values (rx_sec, tx_sec, ...)
// are calculated correctly beginning with the second call of the function.
// It is determined by calculating the difference of transferred bytes / IOs divided by the time between two calls of the function.
// The first time you are calling one of this functions, you will get -1 for transfer rates.
// The second time, you should then get statistics based on the time between the two calls.

setInterval(function () {
  require('systeminformation').networkStats()
})
