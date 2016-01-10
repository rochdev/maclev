'use strict';

var compression = require('compression');
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var app = connect();
var download = require('./lib/download');

app.use(compression());
app.use(serveStatic('www'));
app.use('/download', download());

http.createServer(app).listen(process.env.PORT || 3000);
