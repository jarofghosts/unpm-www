var filed = require('filed')
  , path = require('path')
  , fs = require('fs')

module.exports = serve_static

function serve_static(req, res, route, config) {
  var file_path = route.splats ? route.splats.join('.') : 'index.html'

  if(!config.static_overrides) return default_static()

  var override_path = path.join(config.static_overrides, file_path)

  fs.exists(override_path, determine_stream)

  function determine_stream(has_override) {
    if(!has_override) return default_static()

    filed(override_path).pipe(res)
  }

  function default_static() {
    filed(path.join(__dirname, '..', '..', 'static', file_path)).pipe(res)
  }
}
