#!/usr/bin/env node

var path = require('path')
  , fs = require('fs')

var nopt = require('nopt')

var package = require('../package.json')
  , www = require('../')

var noptions = {
    port: Number
  , prefix: String
  , registry: String
  , help: Boolean
}

var shorts = {
    p: ['--port']
  , P: ['--prefix']
  , r: ['--registry']
  , h: ['--help']
  , v: ['--version']
}

var options = nopt(noptions, shorts)
  , port

if(options.version) return version()
if(options.help) return help()

port = options.port || 8999

www(options.registry).listen(port)
console.log('unpm-www listening on port ' + port)

function version() {
  console.log(package.name + ' version ' + package.version)
}

function help() {
  version()
  fs.createReadStream(path.join(__dirname, '..', 'help.txt'))
    .pipe(process.stderr)
}
