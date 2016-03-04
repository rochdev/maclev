'use strict';

var cache = require('../cache');
var find = require('../util/find');

module.exports = {
  run() {
    cache.outdated('ruby_versions', () => {
      find.json(`https://api.github.com/repos/rbenv/ruby-build/contents/share/ruby-build`, 'name', (versions) => {
        versions = versions.map((version) => {
          return {name: version};
        });

        cache.add('ruby_versions', versions);
      });
    });
  }
};
