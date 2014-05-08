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
    , complete = 0

  var endpoint = {
      hostname: registry.hostname
    , port: registry.port || 80
    , agent: false
  }

  var dependents_path = '/-/_view/dependedUpon/'
    , dependents_query
    , dependents = []

  dependents_query = '?' + qs.stringify({
      startkey: '["' + route.params.name + '"]'
    , endkey: '["' + route.params.name + '", {}]'
    , group_level: 3
  })

  endpoint.path = dependents_path + dependents_query

  http.get(endpoint, parse_dependents).on('error', function() {
    errors.server_error(req, res)
  })

  function parse_dependents(response) {
    if(response.statusCode !== 200) return ++complete && next()

    response.pipe(concat(parse_dependents_data))

    function parse_dependents_data(data) {
      var dep_data = JSON.parse('' + data)

      for(var i = 0, l = dep_data.rows.length; i < l; ++i) {
        console.log(dep_data)
        dependents.push({
            name: dep_data.rows[i].key[1]
          , description: dep_data.rows[i].key[2]
        })
      }

      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
      res.end(dependent_template({name: route.params.name, dependents: dependents, config: config}))
    }
  }
}
