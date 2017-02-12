'use strict'

const search = require('../../util/search')

module.exports.handler = search('brew.json', { limit: 30 })
