'use strict';

var async = require('async');
var cache = require('../cache');
var find = require('../util/find');

module.exports = {
  run() {
    cache.outdated('brew_formulas', () => {
      async.parallel([
        function(callback) {
          find.json(`https://api.github.com/repos/homebrew/homebrew/git/trees/master`, function(repo) {
            find.json(repo.tree.find((entry) => entry.path === 'Library').url, function(library) {
              find.json(library.tree.find((entry) => entry.path === 'Formula').url, function(formula) {
                var formulas = formula.tree.map((file) => file.path.replace(/\.rb$/, ''));

                callback(null, formulas);
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
        if (!err) {
          var formulas = Array.prototype.concat.apply([], results).map((result) => {
            return {name: result};
          });

          cache.add('brew_formulas', formulas);
        }
      });
    });
  }
};
