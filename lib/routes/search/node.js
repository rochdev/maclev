'use strict';

var semver = require('semver');
var find = require('../../util/find');

module.exports = function(req, res) {
  find.regex('https://nodejs.org/dist/', /href="(v\d+\.\d+\.\d+)\/"/g, function(versions) {
    res.send(versions.filter((v) => semver.valid(v)).filter((version) => {
      return !req.query.query || version.indexOf(req.query.query) !== -1;
    }).sort(semver.rcompare));
  });
};
