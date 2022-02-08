const { createContainer } = require('awilix');
const usersOperations = require('src/app/users');
const jsonPlaceHolderClient = require('src/interfaces/json-place-holder');
import mongoClient from './infra/database/mongo/mongoClient';
import repositories from './infra/repositories';

const container = createContainer();

container.registerClass(mongoClient);
container.registerClass(repositories);
container.registerClass(usersOperations);
container.registerClass(jsonPlaceHolderClient);

export default container;
