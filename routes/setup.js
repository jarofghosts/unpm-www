var Router = require('unpm-router')
  , router = new Router()

var packages = require('./package')
  , statics = require('./static')

router.add('get', '/package/:name', packages)
router.add('get', '/', statics)
router.add('get', '/*.*', statics)

module.exports = router
