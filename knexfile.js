'use strict';

module.exports = {
  client: 'pg',
  connection: {
    host     : 'postgres',
    user     : process.env.POSTGRES_USER || 'postgres',
    password : process.env.POSTGRES_PASSWORD || '',
    database : process.env.POSTGRES_DB || process.env.POSTGRES_USER || 'postgres'
  }
};
