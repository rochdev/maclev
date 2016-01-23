//https://ac.cnstrc.com/autocomplete/a?callback=jQuery2140523691039532423_1453503165237&autocomplete_key=CD06z4gVeqSXRiDL2ZNK&query=a&_=1453503165238

'use strict';

var request = require('superagent');

module.exports = function(req, res) {
  var query = req.query.query || 'a';

  request
    .get(`https://ac.cnstrc.com/autocomplete/${query}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK&query=${query}`)
    .end(function(err, response) {
      if (err || response.status !== 200) {
        res.send([]);
      } else {
        res.send(JSON.parse(response.text).sections.packages.map((pkg) => pkg.value));
      }
    });
};
