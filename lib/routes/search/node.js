'use strict';

var semver = require('semver');
var db = require('../../data/db');

module.exports = function(req, res) {
  db.from('node_versions')
    .pluck('name')
    .search(req.query.query)
    .get((versions) => res.send(versions.filter((v) => semver.valid(v)).sort(semver.rcompare)));
};
