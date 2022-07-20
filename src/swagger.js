const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger/swagger-doc.json'
const endpointsFiles = ['./src/interfaces/http/router/routes.ts']
const doc = {
    info: {
      version: '1.0.0',
      title: 'Sold Service Api',
      description: 'RESO Compliant extraction of webapi feeds for Sold Data',
    },
    schemes: ['http', 'https'],
  };

swaggerAutogen(outputFile, endpointsFiles, doc)