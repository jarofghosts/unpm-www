module.exports = packagify

function packagify(data) {
  var current_version = data['dist-tags'].latest

  return {
      name: data.name
    , description: data.description
    , author: data.versions[current_version].author.name || 'Anonymous'
    , last_modified: data.time.modified
    , created: data.time.created
    , version: current_version
    , readme: data.readme
    , dependencies: depify(data.versions[current_version].dependencies)
    , repository: data.repository.url
    , repository_www: repoify(data.repository.url)
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
