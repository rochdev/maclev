'use strict'

const store = require('../../store')
const request = require('superagent')
const JSONStream = require('JSONStream')
const es = require('event-stream')

module.exports.handler = (event, context, callback) => {
  const modules = []

  request.get('http://registry.npmjs.org/-/all')
    .on('end', () => store.put(event.stage, 'npm.json', modules).then(callback))
    .on('error', callback)
    .pipe(JSONStream.parse([true]))
    .pipe(es.map(module => {
      module.name && modules.push(module.name)
    }))
}
