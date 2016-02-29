'use strict';

var db = require('./lib/data/db');
var app = require('./lib/app');

const PORT = process.env.PORT || 3000;

db.init(() => app.listen(PORT));
