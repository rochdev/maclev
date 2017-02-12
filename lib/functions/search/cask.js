'use strict'

const search = require('../../util/search')

module.exports.handler = search('cask.json', { limit: 30 })
