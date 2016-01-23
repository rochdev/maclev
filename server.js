'use strict';

const PORT = process.env.PORT || 3000;

var compression = require('compression');
var express = require('express');
var app = express();

var download = require('./lib/routes/download');
var brew = require('./lib/routes/search/brew');
var node = require('./lib/routes/search/node');
var npm = require('./lib/routes/search/npm');

app.use(compression());
app.get('/download', download);
app.get('/search/brew', brew);
app.get('/search/node', node);
app.get('/search/npm', npm);
app.use(express.static('www'));
app.listen(PORT);
