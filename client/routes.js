const routes = require('next-routes')();

routes
  .add('/screen1', '/screen/tab1')
  .add('/screen2', '/screen/tab2');

module.exports = routes;
