'use strict';

var db = require('../../data/db');

module.exports = function(req, res) {
  db.from('node_modules')
    .pluck('name')
    .search(req.query.query)
    .limit(1000)
    .get((modules) => res.send(modules));
};
