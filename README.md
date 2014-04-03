&mu;npm-www
====

a web frontend for [&mu;npm](https://github.com/hayes/unpm)

## installation

`npm install -g unpm-www`

## usage

`unpm-www`

* `--port, -p <port>` Listen on `<port>`, defaults to `8999`
* `--registry, -r <registry>` Use `<registry>` for package data, defaults to
'http://localhost:8123'
* `--version, -v` Print version information
* `--help, -h` Print help text

## as a module

yep, you can do that

```js
var www = require('unpm-www')

var server = www('http://registry.npmjs.org') // defaults to 'http://localhost:8123'
server.listen(8999) // tada!
```

## extending

you are given access to the router for you to add your own routes if you would
like. or override them.

`router` is an instance of [unpm-router](http://npm.im/unpm-router), which
works pretty much like you would expect a router to.

something like this:

```js
var www = require('unpm-www')

var router = www.router

router.add('get', '/ping', ping)

www().listen(1337)

function ping(req, res, route, config) {
  // route holds information like [routes](http://npm.im/routes)
  // config is a configuration object, currently with one key "registry"
  res.end('pong')
}
```

## notes

works with any npm-compatible registry.

## license

MIT
