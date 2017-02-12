'use strict'

const request = require('superagent')

module.exports.handler = (event, context, callback) => {
  const query = event.queryStringParameters && event.queryStringParameters.query
  let promise

  if (query) {
    promise = request
      .get('https://rubygems.org/api/v1/search.json')
      .query({ query })
      .then(response => response.body.map(entry => entry.name))
  } else {
    promise = Promise.resolve([])
  }

  promise
    .then(results => callback(null, {
      body: JSON.stringify(results),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }))
    .catch(callback)
}
