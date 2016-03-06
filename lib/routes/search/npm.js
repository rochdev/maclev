'use strict';

var db = require('../../db');

module.exports = function(req, res) {
  db.pluck('name')
    .from('node_modules')
    .where('name', 'like', `%${req.query.query}%`)
    .limit(30)
    .then((modules) => res.send(modules))
    .catch(() => res.send([]));
};
