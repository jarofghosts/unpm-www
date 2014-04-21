var highlight = require('highlight.js')
  , sanitizer = require('sanitizer')
  , marked = require('marked')

marked.setOptions({
    highlight: highlight_code
  , sanitize: true
  , breaks: true
  , tables: true
})

module.exports = readmeify

function readmeify(data, ready) {
  marked(data, sanitize)

  function sanitize(err, html) {
    if(err) return ready(err)

    return ready(null, sanitizer.sanitize(html, uri))
  }
}

function uri(value) {
  return value
}

function highlight_code(code) {
  return highlight.highlightAuto(code).value
}
