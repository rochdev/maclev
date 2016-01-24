'use strict';

var semver = require('semver');
var find = require('../../util/find');

module.exports = function(req, res) {
  find.regex(`https://svn.ruby-lang.org/cgi-bin/viewvc.cgi/tags/`, /name="(v\d+[^"]+)"/g, true, function(versions) {
    res.send(versions.map((v) => normalize(v)).filter((v) => semver.valid(v)).filter((version) => {
      return !req.query.query || version.indexOf(req.query.query) !== -1;
    }).sort(semver.rcompare));
  });
};

function normalize(version) {
  return version.replace('_', '.').replace('_', '.').replace(/_/g, '-');
}
