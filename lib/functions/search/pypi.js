
const search = require('../../util/search')

module.exports.handler = search('pypi.json', { limit: 30 })
