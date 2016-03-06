'use strict';

var db = require('../../db');

module.exports = function(req, res) {
  db.pluck('name')
    .from('brew_formulas')
    .where('name', 'like', `%${req.query.query}%`)
    .limit(30)
    .then((formulas) => res.send(formulas))
    .catch(() => res.send([]));
};
