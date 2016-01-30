'use strict';

var services = JSON.parse(process.env.VCAP_SERVICES)["mongolab"][0];
var url = services.credentials.uri;

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var QueryBuilder = require('./query-builder');

var _db;

module.exports = {
  init(callback) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      _db = db;
      callback();
    });
  },

  from(collection) {
    return new QueryBuilder(_db, {
      from: collection
    });
  }
};
