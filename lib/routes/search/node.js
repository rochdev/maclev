'use strict';

var semver = require('semver');
var db = require('../../db');

module.exports = function(req, res) {
  db.pluck('name')
    .from('node_versions')
    .where('name', 'like', `%${req.query.query}%`)
    .then((versions) => res.send(versions.filter((v) => semver.valid(v)).sort(semver.rcompare)))
    .catch(() => res.send([]));
};
