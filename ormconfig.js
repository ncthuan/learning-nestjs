/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// const path = require('path');
require('dotenv').config();
//console.log('NODE_ENV', process.env.NODE_ENV, process.env.TS_NODE);

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOG,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  //"migrationsRun": false,
  //"migrationsTransactionMode": "each",
  //"migrations": ['./src/database/migrations/*.{ts,js}'],
};

//console.log(module.exports);
