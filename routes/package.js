var http = require('http')
  , path = require('path')
  , url = require('url')
  , fs = require('fs')

var concat = require('concat-stream')
  , altr = require('altr')

var packagify = require('../lib/packagify')
  , readmeify = require('../lib/readmeify')
  , errors = require('./errors')

var package_template = altr('' + fs.readFileSync(
    path.resolve(__dirname, '..', 'templates', 'package.html')
))

module.exports = serve_package

function serve_package(req, res, route, config) {
  var registry = url.parse(config.registry)

  var endpoint = {
      hostname: registry.hostname
    , port: registry.port || 80
    , path: '/' + route.params.name
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

      readmeify(package_data.readme, write_response)

      function write_response(err, html) {
        if(err) return errors.server_error(req, res)
        package_data.readme = html

        package_template.update(package_data)

        res.writeHead(200, {'content-type': 'text/html'})
        res.end('' + package_template)
      }
    }
  }
}
