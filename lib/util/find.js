'use strict';

var request = require('superagent');

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
  request
    .get(url)
    .end(function(err, response) {
      callback(err, response && response.text);
    });
}
