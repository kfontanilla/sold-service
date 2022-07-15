const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger/swagger-doc.json'
const endpointsFiles = ['./src/interfaces/http/router/routes.ts']

swaggerAutogen(outputFile, endpointsFiles)