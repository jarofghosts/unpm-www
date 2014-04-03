var path = require('path')
  , fs = require('fs')

var altr = require('altr')

var template_path = path.resolve(__dirname, '..', 'templates')

var templates = {
    'package': '' + fs.readFileSync(path.join(template_path, 'package.html'))
  , 'header': '' + fs.readFileSync(path.join(template_path, 'header.html'))
  , 'footer': '' + fs.readFileSync(path.join(template_path, 'footer.html'))
  , 'index': '' + fs.readFileSync(path.join(template_path, 'index.html'))
}

var template_names = Object.keys(templates)

for(var i = 0, l = template_names.length; i < l; ++i) {
  altr.include(template_names[i], templates[template_names[i]])
}

module.exports = template

function template(name, starting_value) {
  var altr_template = altr(templates[name], starting_value)

  return altr_template
}
