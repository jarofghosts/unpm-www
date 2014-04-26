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
* `--static, -s <dir>` Use files in `<dir>` to override static files when
serving requests. (will fall back to defaults as necessary)
* `--title, -t <title>` Title the page `<title>`, defaults to "unpm"
* `--version, -v` Print version information
* `--help, -h` Print help text

## as a module

yep, you can do that:

```js
var www = require('unpm-www')

var server = www('http://registry.npmjs.org')
server.listen(8999) // tada!
```

## api

`unpm_www(registry, prefix, title, static) -> httpServer`

* `registry` is the location of the npm-like registry you wish to use for
package data, default is `'http://localhost:8123'`
* `prefix` will put all routes behind that given prefix
* `title` is simply the title for the page header, default is `'unpm'`
* `static` is a directory with files to override static files

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

function ping(req, res, route, config) {
  res.end('pong')
}

www().listen(1337)
```

* `route` holds information like [routes](http://npm.im/routes)
* `config` is a configuration object, currently with keys: "registry" and
"prefix" (as explained above)

## notes

works with any npm-compatible registry.

## license

MIT
