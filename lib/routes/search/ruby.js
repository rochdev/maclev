'use strict';

var db = require('../../data/db');

module.exports = function(req, res) {
  db.from('ruby_versions')
    .pluck('name')
    .search(req.query.query)
    .get((versions) => res.send(versions));
};
