'use strict';

var db = require('../../db');

module.exports = function(req, res) {
  db.pluck('name')
    .from('brew_casks')
    .where('name', 'like', `%${req.query.query}%`)
    .limit(30)
    .then((casks) => res.send(casks))
    .catch(() => res.send([]));
};
