var Router = require('unpm-router')
  , router = new Router()

var packages = require('./package')
  , statics = require('./static')
  , main = require('./main')

router.add('get', '/package/:name', packages)
router.add('get', '/', main)
router.add('get', '/index.html', main)
router.add('get', '/*.*', statics)

module.exports = router
