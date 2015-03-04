var qs = require('querystring')
  , http = require('http')
  , url = require('url')

var concat = require('concat-stream')

var template = require('../template')
  , errors = require('./errors')

var dependent_template = template('dependents')

module.exports = serve_package

function serve_package(req, res, route, config) {
  var registry = url.parse(config.registry)

  var endpoint = {
      hostname: registry.hostname
    , port: registry.port || 80
    , agent: false
  }

  var dependents_path = '/-/_view/dependedUpon/'
    , name = route.params.name
    , dependents_query
    , dependents = []

  if(route.params.scope) {
    name = route.params.scope + '/' + name
  }

  dependents_query = '?' + qs.stringify({
      startkey: '["' + name + '"]'
    , endkey: '["' + name + '", {}]'
    , group_level: 3
  })

  endpoint.path = dependents_path + dependents_query

  http.get(endpoint, parse_dependents).on('error', function() {
    errors.server_error(req, res)
  })

  function parse_dependents(response) {
    if(response.statusCode !== 200) return errors.not_found(req, res)

    response.pipe(concat(parse_dependents_data))

    function parse_dependents_data(data) {
      var dep_data = JSON.parse('' + data)

      for(var i = 0, l = dep_data.rows.length; i < l; ++i) {
        dependents.push({
            name: dep_data.rows[i].key[1]
          , description: dep_data.rows[i].key[2]
        })
      }

      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(dependent_template({
          name: route.params.name.replace('/').replace('/', '%2f')
        , dependents: dependents
        , config: config
        , base: route.params.scope ? '../../../' : '../../'
      }))
    }
  }
}
