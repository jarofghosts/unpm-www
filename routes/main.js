var template = require('../lib/template')

var index_template = template('index')

module.exports = main

function main(req, res, route, config) {
  index_template.update(config)

  res.writeHead(200, {'content-type': 'text/html'})
  res.end('' + index_template)
}
