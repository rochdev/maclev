'use strict';

var async = require('async');
var find = require('../../util/find');
var client = require('../../redis-client');

module.exports = function(req, res) {
  client.get('brew-formulas', function(err, reply) {
    if (reply) {
      res.send(JSON.parse(reply).filter(req.byQuery));
    } else {
      async.parallel([
        function(callback) {
          find.json(`https://api.github.com/repos/homebrew/homebrew/git/trees/master`, function(repo) {
            find.json(repo.tree.find((entry) => entry.path === 'Library').url, function(library) {
              find.json(library.tree.find((entry) => entry.path === 'Formula').url, function(formula) {
                var formulas = formula.tree.map((file) => file.path.replace(/\.rb$/, ''));

                callback(null, formulas.filter(req.byQuery));
              });
            });
          });
        },
        function(callback) {
          find.json(`https://api.github.com/repos/homebrew/homebrew-science/git/trees/master`, function(repo) {
            var formulas = repo.tree
              .filter((file) => /\.rb$/.test(file.path))
              .map((file) => 'homebrew/science/' + file.path.replace(/\.rb$/, ''));

            callback(null, formulas);
          });
        },
        function(callback) {
          find.json(`https://api.github.com/repos/homebrew/homebrew-versions/git/trees/master`, function(repo) {
            var formulas = repo.tree
              .filter((file) => /\.rb$/.test(file.path))
              .map((file) => 'homebrew/versions/' + file.path.replace(/\.rb$/, ''));

            callback(null, formulas);
          });
        }
      ], function(err, results) {
        if (err) {
          return res.send([]);
        }

        var formulas = Array.prototype.concat.apply([], results).sort();

        client.set('brew-formulas', JSON.stringify(formulas));
        client.expire('brew-formulas', 3600);

        res.send(formulas);
      });
    }
  });
};
