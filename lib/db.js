'use strict';

var knex = require('knex');
var config = require('../knexfile');
var instance = null;

module.exports = {
  init: init,
  get: () => instance
};

function init() {
  instance = knex(config);

  return instance.migrate.latest()
    .catch(handleError);
}

function handleError() {
  return new Promise((resolve) => {
    setTimeout(() => init().then(resolve), 1000)
  });
}
