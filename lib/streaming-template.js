var template = require('medium-templater')()
  , through = require('through')

module.exports = streaming_template

function streaming_template(context) {
  var stream = through(write, end)
    , html = ''

  return stream

  function write(data) {
    html += data
  }

  function end() {
    stream.queue(template(html)(context))
  }
}
