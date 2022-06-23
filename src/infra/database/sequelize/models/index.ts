const ModelsLoader = require('src/infra/database/sequelize/ModelsLoader')
const Sequelize = require('sequelize')
const configuration = require('config').db

if (configuration) {
  const sequelize = new Sequelize({
    logging: false,
    define: {
      underscored: true,
    },
    ...configuration,
  })
  const { models, database } = ModelsLoader.load({
    sequelize,
    baseFolder: __dirname,
  })

  module.exports = {
    sequelize,
    models,
    database,
  }
} else {
  console.error('Database config file not found, disabling database.')
}
