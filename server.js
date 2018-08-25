const config = require('./config/config.dev');
const http = require( 'http');
const router = require('./routes');
const service = require('./services');
const cron = require('./cronjob');

const server = http.createServer(router);
service.init();
cron.init();

server.listen(config.server.port, () => {
  console.log('server listing on: ', config.server.port);
});