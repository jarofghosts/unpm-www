www-&mu;npm
====

a web frontend for &mu;npm

## installation

`npm install -g unpm-www`

## usage

`unpm-www`

* `--port, -p <port>` Listen on `<port>`, defaults to `8999`
* `--registry, -r <registry>` Use `<registry>` for package data
* `--version, -v` Print version information
* `--help, -h` Print help text

## as a module

yep, you can do that

```js
var www = require('unpm-www')

var server = www('http://registry.npmjs.org') // defaults to 'http://localhost:8123'
server.listen(8999) // tada!
```

## license

MIT
