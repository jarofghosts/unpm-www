var Router = require('unpm-router')

var packages = require('./package')
  , statics = require('./static')
  , main = require('./main')

module.exports = setup

function setup(_prefix) {
  var router = new Router(_prefix)

  router.add('get', '/package/:name', packages)
  router.add('get', '/', main)
  router.add('get', '/index.html', main)
  router.add('get', '/*.*', statics)

  return router
}
