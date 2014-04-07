var crypto = require('crypto')

module.exports = packagify

function packagify(data) {
  var current_version = data['dist-tags'].latest

  var current_data = data.versions[current_version]
    , author = current_data.author || {}

  var maintainer = current_data.maintainers && current_data.maintainers[0]
  maintainer = maintainer || (data.maintainers && data.maintainers[0])
  maintainer = maintainer || {}

  var author_email = author.email || maintainer.email
    , author_name = author.name || maintainer.name

  return {
      name: data.name
    , description: data.description
    , author: author_name
    , author_email: author_email
    , default_avatar: encodeURIComponent('http://i.imgur.com/QgNMMnd.png')
    , keywords: data.versions[current_version].keywords || []
    , author_avatar: gravatarify(author_email)
    , last_modified: data.time.modified
    , created: data.time.created
    , version: current_version
    , readme: data.readme || data.versions[current_version].readme || '*N/A*'
    , dependencies: depify(data.versions[current_version].dependencies)
    , repository: (data.repository || {}).url || ''
    , repository_www: repoify((data.repository || {}).url || '')
  }
}

function depify(deps) {
  return Object.keys(deps || {}).map(make_deps_nice)

  function make_deps_nice(el) {
    return {name: el, version: deps[el]}
  }
}

function repoify(repo) {
  return repo.replace(/^git/, 'https').replace(/\.git$/, '')
}

function gravatarify(email) {
  if (!email) return '/images/default.png'
  var hash = crypto.createHash('md5')
  hash.write(email.toLowerCase().trim())

  return 'http://www.gravatar.com/avatar/' + hash.digest('hex')
}
