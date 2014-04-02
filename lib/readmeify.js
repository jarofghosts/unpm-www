var highlight = require('highlight.js')
  , marked = require('marked')

marked.setOptions({highlight: highlight_code})

module.exports = readmeify

function readmeify(data, ready) {
  marked(data, ready)
}

function highlight_code(code) {
  return highlight.highlightAuto(code).value
}
