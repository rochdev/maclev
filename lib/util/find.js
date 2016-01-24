'use strict';

var request = require('superagent');
var client = require('../redis-client');

module.exports = {
  json: function(url, path, callback) {
    if (!callback) {
      callback = path;
      path = null;
    }

    fetch(url, function(err, response) {
      if (err) {
        return callback([]);
      }

      if (path) {
        callback(JSON.parse(response).map((entry) => entry[path]));
      } else {
        callback(JSON.parse(response));
      }
    });
  },

  regex: function(url, pattern, callback) {
    fetch(url, function(err, response) {
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
    });
  }
};

function fetch(url, callback) {
  client.get(url, function(err, reply) {
    if (reply) {
      callback(null, reply);
    } else {
      request
        .get(url)
        .end(function(err, response) {
          if (!err) {
            client.set(url, response.text);
            client.expire(url, 3600);
          }

          callback(err, response && response.text);
        });
    }
  });
}
