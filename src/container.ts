const { createContainer } = require('awilix');
const configs = require('../config');
const { database, models } = require('./infra/database/sequelize/models');
const usersOperations = require('src/app/users');
const soldsOperations = require('src/app/solds');
const importConfigOperations = require('src/app/importconfigs');
const jsonPlaceHolderClient = require('src/interfaces/json-place-holder');
const mlsGridClient = require('src/interfaces/mls-grid');
const bridgeClient = require('src/interfaces/bridge');
import http from './infra/http';
import utilOperations from './utils';
import mongoClient from './infra/database/mongo/mongoClient';
import repositories from './infra/repositories';

const container = createContainer();

container.registerValue({ configs });

// NoSQL
// container.registerClass(mongoClient);

// RDS
container.registerValue(models);
container.registerValue({ database });

// HTTP
container.registerClass(http);

// UTILS
container.registerClass(utilOperations);

container.registerClass(repositories);

container.registerClass(usersOperations);
container.registerClass(soldsOperations);
container.registerClass(importConfigOperations);

container.registerClass(jsonPlaceHolderClient);
container.registerClass(mlsGridClient);
container.registerClass(bridgeClient);

export default container;
