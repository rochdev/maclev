'use strict';

var _ = require('lodash');
var db = require('./db');

const DAY = 24 * 60 * 60 * 1000;

module.exports = {
  add(collection, items) {
    var batch = _.chunk(items, 1000);

    return db.transaction((trx) => {
      return Promise.all([
        trx('updates')
          .update('updated_at', db.fn.now())
          .where('name', collection),

        Promise.all(batch.map((items) => {
          return trx.raw(trx.insert(items).into(collection).toString() + ` on conflict do nothing`);
        }))
      ]);
    });
  },

  outdated(collection, trueFn, falseFn) {
    db.first()
      .from('updates')
      .where('name', collection)
      .then((row) => {
        var timestamp = row.updated_at ? row.updated_at.getTime() : 0;

        Date.now() - timestamp > DAY ? trueFn && trueFn(timestamp) : falseFn && falseFn();
      });
  }
};
