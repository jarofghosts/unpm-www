var path = require('path')
  , http = require('http')

var errors = require('./routes/errors')
  , router = require('./routes/setup')
  , filed = require('filed')

var config = {}

module.exports = unpm_www

function unpm_www(port, registry) {
  config.registry = registry || 'http://localhost:8123'

  http.createServer(handler).listen(port)

  function handler(req, res) {
    var route = router.match(req)

    if(!route) return errors.not_found(res)

    route.fn(req, res, route, config)
  }
}

return unpm_www(8099, 'http://registry.npmjs.org')
