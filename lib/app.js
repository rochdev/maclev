'use strict';

var compression = require('compression');
var express = require('express');
var app = express();

app.use(compression());
app.get('/download', require('./routes/download'));
app.get('/search/brew', require('./routes/search/brew'));
app.get('/search/cask', require('./routes/search/cask'));
app.get('/search/node', require('./routes/search/node'));
app.get('/search/npm', require('./routes/search/npm'));
app.get('/search/ruby', require('./routes/search/ruby'));
app.get('/search/gems', require('./routes/search/gems'));
app.use(express.static('www'));

module.exports = app;
