'use strict';

var redis = require('redis');

if (!process.env.VCAP_SERVICES) {
  process.env.VCAP_SERVICES = JSON.stringify(require('../env.json'));
}

var services = JSON.parse(process.env.VCAP_SERVICES)["rediscloud"][0];
var credentials = services.credentials;
var client = redis.createClient(credentials.port, credentials.hostname, {no_ready_check: true});

client.auth(credentials.password);

module.exports = client;
