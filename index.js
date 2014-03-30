var path = require('path')

var router = require('./routes/setup')
  , filed = require('filed')

module.exports = unpm_www

function unpm_www(port) {
  http.createServer(handler).listen(port)

  function handler(req, res) {
    var route = router.match(req)

    if(!route) return not_found(res)

    route.fn(req, res, router)
  }
}

function not_found(res) {
  res.writeHead(404)
  filed(path.join(__dirname, 'static', 'errors', '404.html')).pipe(res)
}
