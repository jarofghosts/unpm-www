var crypto = require('crypto')

module.exports = packagify

function packagify(data) {
  var current_version = data['dist-tags'].latest

  var author_name = data.versions[current_version].author.name ||
    data.maintainers[0].name
  
  var author_email = data.versions[current_version].author.email ||
    data.maintainers[0].email

  return {
      name: data.name
    , description: data.description
    , author: author_name
    , author_email: author_email
    , default_avatar: encodeURIComponent('http://i.imgur.com/QgNMMnd.png')
    , author_avatar: gravatarify(author_email)
    , last_modified: data.time.modified
    , created: data.time.created
    , version: current_version
    , readme: data.readme || data.versions[current_version].readme || '*N/A*'
    , dependencies: depify(data.versions[current_version].dependencies)
    , repository: data.repository.url || ''
    , repository_www: repoify(data.repository.url || '')
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
