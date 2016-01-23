'use strict';

var request = require('superagent');

const REGEX = /href="(v\d+\.\d+\.\d+)\/"/g;

module.exports = function(req, res) {
  request
    .get('https://nodejs.org/dist/')
    .end(function(err, response) {
      if (err || response.status !== 200) {
        res.send([]);
      } else {
        let versions = [];
        let match;

        while (match = REGEX.exec(response.text)) {
          versions.push(match[1]);
        }

        res.send(versions.filter((version) => {
          return !req.query.query || version.indexOf(req.query.query) !== -1;
        }).reverse());
      }
    });
};
