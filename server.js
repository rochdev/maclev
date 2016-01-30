'use strict';

var compression = require('compression');
var express = require('express');
var db = require('./lib/data/db');

const PORT = process.env.PORT || 3000;

db.init(function() {
  var app = express();

  app.use(compression());
  app.get('/download', require('./lib/routes/download'));
  app.get('/search/brew', require('./lib/routes/search/brew'));
  app.get('/search/cask', require('./lib/routes/search/cask'));
  app.get('/search/node', require('./lib/routes/search/node'));
  app.get('/search/npm', require('./lib/routes/search/npm'));
  app.get('/search/ruby', require('./lib/routes/search/ruby'));
  app.use(express.static('www'));
  app.listen(PORT);
});
