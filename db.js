const pg = require('pg-promise')();
const dbConfig = 'postgres://joelsmith@localhost:5432/fairgrounds';
const db = pg(dbConfig);

module.exports = db;
