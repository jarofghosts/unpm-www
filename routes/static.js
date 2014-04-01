var filed = require('filed')
  , path = require('path')

module.exports = serve_static

function serve_static(req, res, route) {
  var file_path = route.splats.join('.')

  filed(path.join(__dirname, 'static', file_path)).pipe(res)
}
