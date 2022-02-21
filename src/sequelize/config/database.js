const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, `../../../config/.env.${process.env.NODE_ENV}`)
});

module.exports = {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_TODO_APP_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT
  },
  test: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_TODO_APP_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT
  },
  production: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_TODO_APP_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT
  }
};
