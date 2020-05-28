// dependencies
var mysql2 = require('mysql2');
const db = require('mysql-promise')();

// to do https://github.com/martinj/node-mysql-promise

const createTables = require('./createTables')

const settings = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  }

if(!settings.database){
  console.log("\nNo Database credentials in Envirnment, please edit .env and run source .env")
  process.exit();
}

console.log(`logging into database ${settings.database} at ${settings.host}\n`)

db.configure(settings, require('mysql2'));

module.exports = {
  db
};
