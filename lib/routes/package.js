var http = require('http')
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

  var endpoint_path = '/' + route.params.name

  var endpoint = {
      hostname: registry.hostname
    , port: registry.port || 80
    , path: endpoint_path
    , agent: false
  }

  http.get(endpoint, parse_response).on('error', function() {
    errors.server_error(req, res)
  })

  function parse_response(response) {
    if(response.statusCode === 404) return errors.not_found(req, res)

    response.pipe(concat(parse_package))

    function parse_package(data) {
      var package_data

      try{
        package_data = JSON.parse('' + data)
      } catch(e) {
        return errors.server_error(req, res)
      }

      package_data = packagify(package_data)
      package_data.registry = config.registry
      package_data.config = {prefix: config.prefix}

      readmeify(package_data.readme, write_response)

      function write_response(err, html) {
        if(err) return errors.server_error(req, res)
        package_data.readme = html

        res.writeHead(200, {'content-type': 'text/html'})
        res.end(package_template(package_data))
      }
    }
  }
}