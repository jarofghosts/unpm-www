var Router = require('unpm-router')

var dependents = require('./dependents')
  , packages = require('./package')
  , statics = require('./static')
  , main = require('./main')

var router = new Router()

router.add('get', '/package/:name', packages)
router.add('get', '/browse/depended/:name', dependents)
router.add('get', '/', main)
router.add('get', '/index.html', main)
router.add('get', '/*.*', statics)

module.exports = router
