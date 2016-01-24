'use strict';

var Q = require('q');
var requireDir = require('require-dir');
var url = require('url');

var addons = requireDir('../addons');

module.exports = function(req, res) {
  var options = {
    addons: req.query.addons ? req.query.addons.split(',') : [],
    formulas: req.query.formulas ? req.query.formulas.split(',') : [],
    nodeVersions: req.query['node-versions'] ? req.query['node-versions'].split(',') : [],
    nodeDefault: req.query['node-default'],
    nodeModules: req.query['node-modules'] ? req.query['node-modules'].split(',') : [],
    rubyVersions: req.query['ruby-versions'] ? req.query['ruby-versions'].split(',') : [],
    rubyDefault: req.query['ruby-default']
  };

  loadAddons().then(function(parts) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="maclev.sh"');

    res.end(parts.filter(function(part) {return !!part;}).join('\n\n'));
  });

  function loadAddons() {
    var names = ['base', 'brew'].concat(options.addons, 'finalize');

    return Q.all(names.filter(function(name) {
      return addons[name] !== undefined;
    }).map(function(name) {
      return addons[name](options);
    }));
  }
};
