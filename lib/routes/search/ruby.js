'use strict';

var semver = require('semver');
var find = require('../../util/find');

module.exports = function(req, res) {
  find.json(`https://api.github.com/repos/rbenv/ruby-build/contents/share/ruby-build`, 'name', function(versions) {
    res.send(versions.filter((v) => semver.valid(v)).filter(req.byQuery).sort(semver.rcompare));
  });
};
