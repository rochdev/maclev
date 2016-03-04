'use strict';

var db = require('./db');

module.exports = {
  process() {
    require('./tasks/brew-casks').run();
    require('./tasks/brew-formulas').run();
    require('./tasks/node-modules').run();
    require('./tasks/node-versions').run();
    require('./tasks/ruby-versions').run();
  }
};
