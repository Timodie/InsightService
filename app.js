const app = require('./src /index');
const LOGGER = require('log4js').getLogger();
const server = require('http');
const port = 3007;

const httpServer = server.createServer(app);
httpServer.listen(port, (err) => {
  if (err) {
    LOGGER.error(err);
  }
  LOGGER.info(`Server started on ${port}`);
});
