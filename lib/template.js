var path = require('path')
  , fs = require('fs')

var mustache = require('mustache')

var template_path = path.resolve(__dirname, '..', 'templates')

var templates = {
    'package': '' + fs.readFileSync(path.join(template_path, 'package.html'))
  , 'header': '' + fs.readFileSync(path.join(template_path, 'header.html'))
  , 'footer': '' + fs.readFileSync(path.join(template_path, 'footer.html'))
  , 'index': '' + fs.readFileSync(path.join(template_path, 'index.html'))
}

module.exports = template

function template(name) {
  mustache.parse(templates[name])

  return function templatize(data) {
    return mustache.render(templates[name], data, templates)
  }
}
