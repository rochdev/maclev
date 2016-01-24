'use strict';

var semver = require('semver');
var find = require('../../util/find');

module.exports = function(req, res) {
  find.json(`https://api.github.com/repos/rbenv/ruby-build/contents/share/ruby-build`, 'name', function(versions) {
    res.send(versions.filter((v) => semver.valid(v)).filter((version) => {
      return !req.query.query || version.indexOf(req.query.query) !== -1;
    }).sort(semver.rcompare));
  });
};
