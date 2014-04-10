var path = require('path')
  , fs = require('fs')

var static_dir = path.resolve(__dirname, '..', '..', 'static', 'errors')

module.exports = {
    not_found: make_response(404)
  , server_error: make_response(500)
}

function make_response(code) {
  return function serve_error(req, res) {
    res.writeHead(code, {'content-type': 'text/html'})
    fs.createReadStream(path.join(static_dir, code + '.html')).pipe(res)
  }
}
