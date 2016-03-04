'use strict';

var request = require('superagent');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var cache = require('../cache');

module.exports = {
  run() {
    var modules = [];

    cache.outdated('node_modules', () => {
      request.get('http://registry.npmjs.org/-/all/since').query({startkey: timestamp})
        .on('end', () => cache.add('node_modules', modules))
        .pipe(JSONStream.parse([true]))
        .pipe(es.map(function(module) {
          if (module.name) {
            modules.push({
              name: module.name
            });
          }
        }));
    });
  }
};
