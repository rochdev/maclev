'use strict'

const request = require('superagent')
const es = require('event-stream')

module.exports = {
  json (url, path) {
    return request
      .get(url)
      .then(response => response.text)
      .then(response => {
        if (path) {
          return JSON.parse(response).map((entry) => entry[path])
        } else {
          return JSON.parse(response)
        }
      })
  },

  regex (url, pattern) {
    const results = []
    const expr = new RegExp(pattern)

    return new Promise((resolve, reject) => {
      request
        .get(url)
        .on('error', reject)
        .pipe(es.split())
        .pipe(es.map((line, callback) => {
          let match

          while ((match = expr.exec(line))) {
            results.push(match[1])
          }

          callback(null, line)
        }))
        .pipe(es.wait(() => resolve(results)))
    })
  }
}
