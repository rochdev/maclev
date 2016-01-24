'use strict';

var find = require('../../util/find');
var client = require('../../redis-client');

module.exports = function(req, res) {
  client.get('brew-formulas', function(err, reply) {
    if (reply) {
      res.send(JSON.parse(reply).filter(req.byQuery));
    } else {
      find.json(`https://api.github.com/repos/homebrew/homebrew/git/trees/master`, function(repo) {
        find.json(repo.tree.find((entry) => entry.path === 'Library').url, function(library) {
          find.json(library.tree.find((entry) => entry.path === 'Formula').url, function(formula) {
            var formulas = formula.tree.map((file) => file.path.replace(/\.rb$/, ''));

            client.set('brew-formulas', JSON.stringify(formulas));
            client.expire('brew-formulas', 3600);

            res.send(formulas.filter(req.byQuery));
          });
        });
      });
    }
  });
};
