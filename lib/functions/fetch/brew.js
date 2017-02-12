'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  Promise.all([
    find.json(`https://api.github.com/repos/homebrew/homebrew-core/git/trees/master`)
      .then(repo => find.json(repo.tree.find(entry => entry.path === 'Formula').url))
      .then(formula => formula.tree.map(file => file.path.replace(/\.rb$/, ''))),

    find.json(`https://api.github.com/repos/homebrew/homebrew-science/git/trees/master`)
      .then(repo => repo.tree.filter(file => /\.rb$/.test(file.path)))
      .then(files => files.map(file => 'homebrew/science/' + file.path.replace(/\.rb$/, ''))),

    find.json(`https://api.github.com/repos/homebrew/homebrew-versions/git/trees/master`)
      .then(repo => repo.tree.filter(file => /\.rb$/.test(file.path)))
      .then(files => files.map(file => 'homebrew/versions/' + file.path.replace(/\.rb$/, '')))
  ])
    .then(values => [].concat.apply([], values))
    .then(formulas => store.put(event.stage, 'brew.json', formulas))
    .then(callback)
    .catch(callback)
}
