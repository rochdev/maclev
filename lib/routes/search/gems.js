'use strict';

var request = require('superagent');

module.exports = function(req, res) {
  if (!req.query.query) {
    return res.send([]);
  }

  request
    .get('https://rubygems.org/api/v1/search.json')
    .query({query: req.query.query})
    .end((err, response) => res.send(err ? [] : response.body.map((entry) => entry.name).sort()));
};
