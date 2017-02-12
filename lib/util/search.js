'use strict'

const store = require('../store')
const query = require('./query')

module.exports = (file, options) => (event, context, callback) => {
  store.get(event.requestContext.stage, file)
    .then(data => query(data, Object.assign({ event }, options)))
    .then(results => callback(null, {
      body: JSON.stringify(results),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }))
    .catch(callback)
}
