'use strict';

var knex = require('knex');
var config = require('../knexfile');

module.exports = knex(config);
