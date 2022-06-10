import express from 'express';
import { config } from 'process';
import swaggerUi from 'swagger-ui-express'
import * as Document from './utils/swagger/swagger-doc.json'

// // Routes configuration
const routes = require('./interfaces/http/router/routes');

const routeList = require('express-routes-catalogue');

class Server {
  app = express();
  config = config;
  constructor() {
    this.start();
  }

  start() {
    this._configure();

    const port = 3000;

    this.app.listen(port, () => {
      console.log(`API Running at port: ${port}`);
    });
  }

  _configure() {
    // remove the Powered by Express header
    // this.app.disable('x-powered-by');

    // load up the routes
    this.app.use(routes());
    this.app.use("/swagger-doc", swaggerUi.serve, swaggerUi.setup(Document));

    // Show available endpoints in the terminal
    routeList.default.terminal(this.app);
  }
}

const server = new Server();

module.exports = Server;
