'use strict';

var db = require('../../data/db');

module.exports = function(req, res) {
  db.from('brew_casks')
    .pluck('name')
    .search(req.query.query)
    .limit(1000)
    .get((casks) => res.send(casks));
};
