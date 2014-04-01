var concat = require('concat-stream')
  , request = require('hyperquest')
  , filed = require('filed')

var template = require('../lib/streaming-template')
  , packagify = require('../lib/packagify')
  , config = require('../lib/config')()
  , errors = require('./errors')

module.exports = serve_package

function serve_package(req, res, routes) {
  var package_data

  request.get(config.unpm_location).pipe(concat(parse_package))

  function parse_package(data) {
    try{
      package_data = JSON.parse(data)
    } catch(e) {
      return errors.five_hundred(req, res)
    }

    package_data = packagify(package_data)

    res.writeHead(200, {'content-type': 'text/html'})
    filed(__dirname, 'templates', 'package.html')
      .pipe(template(data))
      .pipe(res)
  }
}
