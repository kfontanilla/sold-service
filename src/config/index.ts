require('dotenv').config()
const fs = require('fs');
const path = require('path');

const ENV: string = process.env.NODE_ENV || "local";

let fileExtension = '.ts'
if (fs.existsSync(`${__dirname}/database.js`)) {
  fileExtension = '.js'
}

const dbConfig = path.join(__dirname, `/database${fileExtension}`);

function loadDbConfig() {
  if (fs.existsSync(dbConfig)) {
    return require(dbConfig)[ENV];
  }
  return null;
}

const configs = {
  db: loadDbConfig(),
};

module.exports = configs;
