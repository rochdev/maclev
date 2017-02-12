'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  Promise.all([
    tap('caskroom/homebrew-cask'),
    tap('caskroom/homebrew-versions')
      .then(casks => casks.map(cask => `caskroom/versions/${cask}`))
  ])
    .then(values => [].concat.apply([], values))
    .then(casks => store.put(event.stage, 'cask.json', casks))
    .then(callback)
    .catch(callback)
}

function tap (name) {
  return find.json(`https://api.github.com/repos/${name}/git/trees/master`)
    .then(repo => find.json(repo.tree.find(entry => entry.path === 'Casks').url))
    .then(casks => casks.tree.filter(file => /\.rb$/.test(file.path)))
    .then(casks => casks.map(file => file.path.replace(/\.rb$/, '')))
}
