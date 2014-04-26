var qs = require('querystring')
  , http = require('http')
  , url = require('url')

var concat = require('concat-stream')

var packagify = require('../packagify')
  , readmeify = require('../readmeify')
  , template = require('../template')
  , errors = require('./errors')

var package_template = template('package')

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
    , dependents = {}
    , package_data

  dependents_query = '?' + qs.stringify({
      startkey: '["' + route.params.name + '"]'
    , endkey: '["' + route.params.name + '", {}]'
    , group_level: 2
  })

  endpoint.path = dependents_path + dependents_query

  http.get(endpoint, parse_dependents).on('error', function() {
    errors.server_error(req, res)
  })

  endpoint.path = '/' + route.params.name

  http.get(endpoint, parse_response).on('error', function() {
    errors.server_error(req, res)
  })

  function parse_dependents(response) {
    if(response.statusCode !== 200) return ++complete && next()

    response.pipe(concat(parse_dependents_data))

    function parse_dependents_data(data) {
      var dep_data = JSON.parse('' + data)
        , total = dep_data.rows.length

      dependents.list = []

      for(var i = 0; i < total && i < 10; ++i) {
        dependents.list.push(dep_data.rows[i].key[1])
      }

      dependents.remain = Math.max(0, total - 10)

      ++complete
      next()
    }
  }

  function parse_response(response) {
    if(response.statusCode === 404) return errors.not_found(req, res)

    response.pipe(concat(parse_package))

    function parse_package(data) {
      try{
        package_data = JSON.parse('' + data)
      } catch(e) {
        return errors.server_error(req, res)
      }

      package_data = packagify(package_data)
      package_data.dependents = dependents
      package_data.config = config

      readmeify(package_data.readme, to_next)

      function to_next(err, html) {
        if(err) return errors.server_error(req, res)
        package_data.readme = html

        ++complete
        next()
      }
    }
  }

  function next() {
    if(complete < 2) return

    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    res.end(package_template(package_data))
  }
}
