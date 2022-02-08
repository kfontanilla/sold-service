const container = require('src/container');

const server = container.resolve('server');

server.start().catch((error: any) => {
  console.error(error.stack);
  process.exit();
});