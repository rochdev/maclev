'use strict'

module.exports = (data, criteria) => {
  const event = criteria.event
  const query = event.queryStringParameters && event.queryStringParameters.query
  const limit = event.queryStringParameters && event.queryStringParameters.limit
  const matches = []

  for (let i = 0, l = data.length, n = 0; i < l; i++) {
    if (!query || data[i].indexOf(query) !== -1) {
      matches.push(data[i])

      ++n

      if (limit && n === limit || criteria.limit && n === criteria.limit) {
        break
      }
    }
  }

  return matches
}
