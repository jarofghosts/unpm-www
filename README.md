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

www(8999, 'http://registry.npmjs.org') // tada
```

## license

MIT
