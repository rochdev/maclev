'use strict';

var _ = require('lodash');
var assert = require('assert');

class QueryBuilder {
  constructor(db, options) {
    this._db = db;
    this._options = _.merge({
      select: [],
      sort: []
    }, options);
  }

  get(callback) {
    var query = {};
    var projection = {_id: 0};
    var sort = {};
    var cursor = this._db.collection(this._options.from);

    if (this._options.search) {
      if (this._options.pluck) {
        query[this._options.pluck] = new RegExp(this._options.search, 'i');
      } else {
        this._options.select.forEach(function(field) {
          query[field] = new RegExp(this._options.search, 'i');
        });
      }
    }

    if (this._options.pluck) {
      projection[this._options.pluck] = 1;
    } else {
      this._options.select.forEach(function(field) {
        projection[field] = 1;
      });
    }

    this._options.sort.forEach((item) => {
      sort[item.field] = item.direction;
    });

    cursor = cursor.find(query);

    if (this._options.limit) {
      cursor = cursor.limit(this._options.limit);
    }

    cursor
      .sort(sort)
      .project(projection)
      .toArray((err, results) => {
        assert.equal(err, null);

        if (this._options.pluck) {
          callback(results.map((result) => result[this._options.pluck]));
        } else {
          callback(results);
        }
      });
  }

  select(fields) {
    fields = Array.prototype.slice.call(arguments, 0);
    return new QueryBuilder(this._db, _.merge({}, this._options, {select: fields}));
  }

  pluck(field) {
    return new QueryBuilder(this._db, _.merge({}, this._options, {
      pluck: field,
      sort: [{
        field: field,
        direction: 1
      }]
    }));
  }

  search(query) {
    return new QueryBuilder(this._db, _.merge({}, this._options, {search: query}));
  }

  sort(field) {
    return new QueryBuilder(this._db, _.merge({}, this._options, {sort: this._options.sort.concat({
      field: field,
      direction: 1
    })}));
  }

  ascending() {
    return this._order(1);
  }

  descending() {
    return this._order(-1);
  }

  limit(count) {
    return new QueryBuilder(this._db, _.merge({}, this._options, {limit: count}));
  }

  _order(direction) {
    var sort = this._options.sort.map((item) => _.merge({}, item));
    sort[sort.length - 1].direction = direction;

    return new QueryBuilder(this._db, _.merge({}, this._options, {sort: sort}));
  }
}

module.exports = QueryBuilder;
