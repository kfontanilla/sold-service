import express from 'express';
import { config } from 'process';

// // Routes configuration
const routes = require('./interfaces/http/router/routes');

const routeList = require('express-routes-catalogue');
// const PORT: string | number = process.env.PORT || 5000;

// app.use('*', (req, res) => {
//   res.send('<h1>Welcome to your simple server! Awesome right</h1>');
// });

// app.listen(PORT, () => console.log(`hosting @${PORT}`));

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

    // Show available endpoints in the terminal
    routeList.default.terminal(this.app);
  }
}

// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const morgan = require('morgan');
// const routeList = require('express-routes-catalogue');

// // Routes configuration
// const routes = require('./routes');

// class Server {
//   constructor({ config, containerMiddleware }) {
//     this.app = express();
//     this.config = config;

//     // Load up the container
//     this.app.use(containerMiddleware);
//   }

//   /**
//    * Boots up the server
//    */
//   start() {
//     // loadup the template engine
//     // this._template();

//     // enable the configuration of the server.
//     this._configure();

//     // start the server
//     return new Promise((resolve) => {
//       const http = this.app.listen(this.config.port || 3000, () => {
//         const { port } = http.address();

//         console.log(`API Running at port: ${port}`);
//       });
//     });
//   }

//   /**
//    * Server Configurations
//    */
//   _configure() {
//     // remove the Powered by Express header
//     // this.app.disable('x-powered-by');

//     // load up the routes
//     this.app.use(routes());

//     // Show available endpoints in the terminal
//     routeList.default.terminal(this.app);

//     // Handle invalid requests
//     this.app.use((req, res) => {
//       return res.status(404).json({ error: 'Not found' });
//     });
//   }

//   /**
//    * Configures the template engine to use.
//    *
//    * @memberof Server
//    */
//   _template() {
//     // static folder
//     // this.app.use(express.static('public'));
//     // // set the template engine
//     // this.app.engine(
//     //   'html',
//     //   hbs.express4({
//     //     extname: '.html',
//     //   })
//     // );
//     // // set the view engine
//     // this.app.set('view engine', 'html');
//     // // set the path of the templates
//     // this.app.set('views', `${__dirname}/resources/views`);
//   }
// }

const server = new Server();

module.exports = Server;
