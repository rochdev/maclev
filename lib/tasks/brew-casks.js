'use strict';

var cache = require('../cache');
var find = require('../util/find');

module.exports = {
  run() {
    cache.outdated('brew_casks', () => {
      find.json(`https://api.github.com/repos/caskroom/homebrew-cask/git/trees/master`, (repo) => {
        find.json(repo.tree.find((entry) => entry.path === 'Casks').url, (cask) => {
          var casks = cask.tree
            .filter((file) => /\.rb$/.test(file.path))
            .map((file) => {return {name: file.path.replace(/\.rb$/, '')};});

          cache.add('brew_casks', casks);
        });
      });
    });
  }
};
