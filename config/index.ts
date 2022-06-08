require('dotenv').config()
const fs = require('fs');
const path = require('path');

const ENV = 'local';
const dbConfig = path.join(__dirname, '/database.ts');

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
