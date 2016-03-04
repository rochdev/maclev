'use strict';

var db = require('../../db');

module.exports = function(req, res) {
  db.get()
    .pluck('name')
    .from('ruby_versions')
    .where('name', 'like', `%${req.query.query}%`)
    .then((versions) => res.send(versions))
    .catch(() => res.send([]));
};
