const { createContainer } = require('awilix');
const configs = require('../config');
const { database, models } = require('./infra/database/sequelize/models');
const usersOperations = require('src/app/users');
const jsonPlaceHolderClient = require('src/interfaces/json-place-holder');
import mongoClient from './infra/database/mongo/mongoClient';
import repositories from './infra/repositories';

const container = createContainer();

container.registerValue({ configs });

// NoSQL
container.registerClass(mongoClient);

// RDS
container.registerValue(models);
container.registerValue({ database });

container.registerClass(repositories);
container.registerClass(usersOperations);
container.registerClass(jsonPlaceHolderClient);

export default container;
