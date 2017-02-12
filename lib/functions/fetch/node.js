'use strict'

const store = require('../../store')
const find = require('../../util/find')

module.exports.handler = (event, context, callback) => {
  find.regex('https://nodejs.org/dist/', /href="(v\d+\.\d+\.\d+)\/"/g)
    .then(versions => store.put(event.stage, 'node.json', versions))
    .then(callback)
    .catch(callback)
}
