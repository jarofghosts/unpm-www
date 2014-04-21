var template = require('../template')

var index_template = template('index')

module.exports = main

function main(req, res, route, config) {
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})

  res.end(index_template({config: config}))
}
