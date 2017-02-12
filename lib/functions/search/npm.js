
const search = require('../../util/search')

module.exports.handler = search('npm.json', { limit: 30 })
