var nopt = require('nopt')

var www = require('../')

var noptions = {
    port: Number
  , registry: String
}

var shorts = {
    p: ['--port']
  , r: ['--registry']
}

var options = nopt(noptions, shorts)

www(options.port, options.registry)
