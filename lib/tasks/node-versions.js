'use strict';

var cache = require('../cache');
var find = require('../util/find');

module.exports = {
  run() {
    cache.outdated('node_versions', () => {
      find.regex('https://nodejs.org/dist/', /href="(v\d+\.\d+\.\d+)\/"/g, (versions) => {
        versions = versions.map((version) => {
          return {name: version};
        });

        cache.add('node_versions', versions);
      });
    });
  }
};
