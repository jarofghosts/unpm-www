var path = require('path')
  , http = require('http')

var errors = require('./routes/errors')
  , router = require('./routes/setup')
  , filed = require('filed')

var config = {}

module.exports = unpm_www

function unpm_www(_port, _registry) {
  var port = _port || 8999

  config.registry = _registry || 'http://localhost:8123'

  http.createServer(handler).listen(port)

  console.log('unpm-www listening on ' + port)

  function handler(req, res) {
    var route = router.match(req)

    if(!route) return errors.not_found(req, res)

    route.fn(req, res, route, config)
  }
}
