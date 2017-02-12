'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  find.regex(`https://pypi.python.org/simple/`, /href='([^']+)'/g)
    .then(packages => store.put(event.stage, 'pypi.json', packages))
    .then(callback)
    .catch(callback)
}

