'use strict';

var Q = require('q');
var requireDir = require('require-dir');
var url = require('url');

var addons = requireDir('addons', {camelcase: true});

module.exports = function download() {
  return function middleware(req, res) {
    var options = url.parse(req.originalUrl, true).query;

    Q.all([
      addons.base(options),
      addons.chrome(options),
      addons.atom(options),
      addons.github(options),
      addons.hub(options),
      addons.bashGitPrompt(options),
      addons.docker(options),
      addons.discord(options),
      addons.slack(options),
      addons.gitter(options),
      addons.node(options),
      addons.ruby(options),
      addons.finalize(options)
    ]).then(function(parts) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename="maclev.sh"');

      res.end(parts.filter(function(part) {return !!part;}).join('\n\n'));
    });
  };
};
