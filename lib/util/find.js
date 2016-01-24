'use strict';

var request = require('superagent');
var client = require('../redis-client');

module.exports = {
  regex: function(url, pattern, cache, callback) {
    if (!callback) {
      callback = cache;
      cache = false;
    }

    if (cache) {
      client.get(url, function(err, reply) {
        if (reply) {
          handle(null, reply);
        } else {
          fetch(url, function(err, response) {
            if (!err) {
              client.set(url, response);
              client.expire(url, 3600);
            }

            handle(err, response);
          });
        }
      });
    } else {
      fetch(url, handle);
    }

    function handle(err, response) {
      if (err) {
        return callback([]);
      }

      let expr = new RegExp(pattern);
      let results = [];
      let match;

      while (match = expr.exec(response)) {
        results.push(match[1]);
      }

      callback(results);
    }
  }
};

function fetch(url, callback) {
  request
    .get(url)
    .end(function(err, response) {
      callback(err, response && response.text);
    });
}
