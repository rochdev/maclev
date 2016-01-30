'use strict';

var compression = require('compression');
var express = require('express');
var search = require('./search-middleware');
var app = express();

app.use();
app.use(compression());
app.use(search);
app.get('/download', require('./routes/download'));
app.get('/search/brew', require('./routes/search/brew'));
app.get('/search/cask', require('./routes/search/cask'));
app.get('/search/node', require('./routes/search/node'));
app.get('/search/npm', require('./routes/search/npm'));
app.get('/search/ruby', require('./routes/search/ruby'));
app.use(express.static('www'));

app.foo = 'bar';
module.exports = app;
