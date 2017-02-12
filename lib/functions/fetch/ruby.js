'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  find.json(`https://api.github.com/repos/rbenv/ruby-build/contents/share/ruby-build`, 'name')
    .then(versions => store.put(event.stage, 'ruby.json', versions))
    .then(callback)
    .catch(callback)
}
