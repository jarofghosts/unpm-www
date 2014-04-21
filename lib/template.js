var path = require('path')
  , fs = require('fs')

var mustache = require('mustache')

var template_path = path.resolve(__dirname, '..', 'templates')

var templates = {
    'package': '' + read_file('package.html')
  , 'header': '' + read_file('header.html')
  , 'footer': '' + read_file('footer.html')
  , 'index': '' + read_file('index.html')
  , 'styles': '' + read_file('styles.html')
}

module.exports = template

function template(name) {
  mustache.parse(templates[name])

  return function templatize(data) {
    return mustache.render(templates[name], data, templates)
  }
}

function read_file(filename) {
  return '' + fs.readFileSync(path.join(template_path, filename))
}
