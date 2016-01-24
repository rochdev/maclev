'use strict';

module.exports = function(req, res, next) {
  req.byQuery = function(item) {
    return !req.query.query || item.toLowerCase().indexOf(req.query.query.toLowerCase()) !== -1;
  };

  next();
};
