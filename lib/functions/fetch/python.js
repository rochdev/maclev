'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  find.json(`https://api.github.com/repos/yyuu/pyenv/contents/plugins/python-build/share/python-build`)
    .then(versions => versions.filter((version) => version.size > 0))
    .then(versions => versions.map(version => version.name))
    .then(versions => store.put(event.stage, 'python.json', versions))
    .then(callback)
    .catch(callback)
}
