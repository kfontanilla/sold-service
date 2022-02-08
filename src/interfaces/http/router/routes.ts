const { Router } = require('express');
const controller = require('src/utils/createControllerRoutes');
const compression = require('compression');
import container from '../../../container';

const routes = () => {
  // Initialize router
  const router = new Router();

  router.get('/users/names', (...args: any) => container.resolve('getUsers').execute(...args));
  router.get('/users/:id', (...args: any) => container.resolve('getUser').execute(...args));
  router.delete('/users/:id', (...args: any) => container.resolve('deleteUser').execute(...args));

  // Show available endpoints in the terminal
  return router;
};

module.exports = routes;