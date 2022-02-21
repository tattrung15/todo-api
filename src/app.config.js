const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, '../config/.env.common')
});
dotenv.config({
  path: path.join(__dirname, `../config/.env.${process.env.NODE_ENV}`)
});

exports.APP_PORT = process.env.APP_PORT;
exports.APP_JWT_SECRET = process.env.APP_JWT_SECRET;
