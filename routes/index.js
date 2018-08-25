const Router = require('node-simple-router');
const apiRoutes = require('./api');
const cronTriggerRoutes = require('./cron-trigger');

const router = new Router();
const routes = [].concat(apiRoutes).concat(cronTriggerRoutes);

routes.forEach((route) => {
  router[route.method](route.url, route.handler);
});

module.exports = router;

