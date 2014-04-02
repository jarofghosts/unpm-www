#!/usr/bin/env node

var path = require('path')
  , fs = require('fs')

var nopt = require('nopt')

var package = require('../package.json')
  , www = require('../')

var noptions = {
    port: Number
  , registry: String
  , help: Boolean
}

var shorts = {
    p: ['--port']
  , r: ['--registry']
  , h: ['--help']
  , v: ['--version']
}

var options = nopt(noptions, shorts)

if(options.version) return version()
if(options.help) return help()

www(options.registry).listen(options.port || 8999)
console.log('unpm-www listening on port ' + (options.port || 8199))

function version() {
  console.log(package.name + ' version ' + package.version)
}

function help() {
  version()
  fs.createReadStream(path.join(__dirname, '..', 'help.txt'))
    .pipe(process.stderr)
}
