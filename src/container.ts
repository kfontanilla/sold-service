const { createContainer, Lifetime } = require('awilix')
const configs = require('./config')
const { database, models } = require('./infra/database/sequelize/models')
const soldsOperations = require('src/app/solds')
const importConfigOperations = require('src/app/importconfigs')
const listingDataOperations = require('src/app/listingdata')

const jsonPlaceHolderClient = require('src/interfaces/json-place-holder')
const mlsGridClient = require('src/interfaces/mls-grid')
const bridgeClient = require('src/interfaces/bridge')
const webAPIClient = require('src/interfaces/base')
const s3Clients = require('./infra/s3')
import http from './infra/http'
import { logger } from './infra/logger/Logger'
import utilOperations from './utils'
import mongoClient from './infra/database/mongo/mongoClient'
import repositories from './infra/repositories'

const container = createContainer()

container
  .registerFunction({
    logger: [logger, { lifetime: Lifetime.SINGLETON }],
  })
  .registerValue({ configs })

// NoSQL
// container.registerClass(mongoClient);

// RDS
// when adding models, consider logging the mapping. sequalize uses the singular form of the words
container.registerValue(models)
container.registerValue({ database })
// HTTP
container.registerClass(http)

// UTILS
container.registerClass(utilOperations)

container.registerClass(repositories)

// S3
container.registerClass(s3Clients)

// Operation
container.registerClass(soldsOperations)
container.registerClass(importConfigOperations)
container.registerClass(listingDataOperations)

container.registerClass(jsonPlaceHolderClient)
container.registerClass(mlsGridClient)
container.registerClass(bridgeClient)
container.registerClass(webAPIClient)

export default container
