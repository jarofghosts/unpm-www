var http = require('http')
  , path = require('path')
  , url = require('url')
  , fs = require('fs')

var concat = require('concat-stream')
  , altr = require('altr')

var packagify = require('../lib/packagify')
  , errors = require('./errors')

var package_template = '' + fs.readFileSync(
    path.resolve(__dirname, '..', 'templates', 'package.html')
)

module.exports = serve_package

function serve_package(req, res, route, config) {
  var registry = url.parse(config.registry)

  var endpoint = {
      hostname: registry.hostname
    , port: registry.port || 80
    , path: '/' + route.params.name
    , agent: false
  }

  http.get(endpoint, parse_response)

  function parse_response(response) {
    if(response.statusCode === 400) return errors.not_found(req, res)

    response.pipe(concat(parse_package))

    function parse_package(data) {
      var package_data

      try{
        package_data = JSON.parse('' + data)
      } catch(e) {
        return errors.server_error(req, res)
      }

      package_data = packagify(package_data)

      res.writeHead(200, {'content-type': 'text/html'})
      res.end('' + altr(package_template, package_data))
    }
  }
}
