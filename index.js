var path = require('path')
  , http = require('http')

var errors = require('./routes/errors')
  , router = require('./routes/setup')

var config = {}

unpm_www.router = router
unpm_www.handler = handler
unpm_www.config = config
module.exports = unpm_www

function unpm_www(_registry, _prefix) {
  config.registry = _registry || 'http://localhost:8123'
  config.prefix = _prefix || ''

  if(config.prefix.slice(-1) !== '/') config.prefix += '/'

  router.root = _prefix || ''

  return http.createServer(handler)
}

function handler(req, res) {
  var route = router.match(req)

  res.setHeader('x-frame-options', 'deny')
  res.setHeader(
      'content-security-policy'
    , "default-src 'self'; img-src *; frame-src 'none'; object-src 'none'"
  )

  if(!route) return errors.not_found(req, res)

  route.fn(req, res, route, config)
}
