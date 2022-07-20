<<<<<<< HEAD
const tracer = require('dd-trace').init({
  logInjection: true,
})

const appName = 'sold-service'
tracer.use('http', { service: appName })
tracer.use('mysql', { service: appName })
tracer.use('dns', { service: appName })
tracer.use('redis', { service: appName })
tracer.use('http2', { service: appName })
=======
if (process.env.NODE_ENV !== 'local') {
  const tracer = require('dd-trace').init({
    logInjection: true,
  })

  const appName = 'sold-service'
  tracer.use('http', { service: appName })
  tracer.use('mysql', { service: appName })
  tracer.use('dns', { service: appName })
  tracer.use('redis', { service: appName })
  tracer.use('http2', { service: appName })
}
>>>>>>> develop

import express from 'express'
import { config } from 'process'
import swaggerUi from 'swagger-ui-express'
import * as Document from './swagger/swagger-doc.json'

// // Routes configuration
const routes = require('./interfaces/http/router/routes')

const routeList = require('express-routes-catalogue')

class Server {
  app = express()
  config = config
  constructor() {
    this.start()
  }

  start() {
    this._configure()

<<<<<<< HEAD
    const port = process.env.PORT ?  process.env.PORT : 8126
=======
    const port = process.env.NODE_ENV === 'local' ? 8126 : 80;
>>>>>>> develop

    this.app.listen(port, () => {
      console.log(`API Running at port: ${port}`)
    })
  }

  _configure() {
    // remove the Powered by Express header
    // this.app.disable('x-powered-by');

    // load up the routes
    this.app.use(routes())
    this.app.use('/swagger-doc', swaggerUi.serve, swaggerUi.setup(Document))

    // Show available endpoints in the terminal
    routeList.default.terminal(this.app)
  }
}

const server = new Server()

module.exports = Server
