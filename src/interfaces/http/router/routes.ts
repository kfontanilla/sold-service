const { Router } = require('express');
import container from '../../../container';

const routes = () => {
  // Initialize router
  const router = new Router();

  router.get('/users', (...args: any) => container.resolve('GetUsers').execute(...args));
  router.get('/users/:id', (...args: any) => container.resolve('GetUser').execute(...args));
  router.delete('/users/:id', (...args: any) => container.resolve('DeleteUser').execute(...args));

  router.get('/solds/:providerType', (...args: any) => container.resolve('GetSoldData').execute(...args));
  
  router.get('/extract/:LegacyImportId', (...args: any) => container.resolve('ExtractData').execute(...args));

  router.get('/importconfigs', (...args: any) => container.resolve('GetImportConfigs').execute(...args));
  router.get('/importconfigs/:LegacyImportId', (...args: any) => container.resolve('GetImportConfig').execute(...args));
  
  // Show available endpoints in the terminal
  return router;
};

module.exports = routes;
