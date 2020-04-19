const logger = require('./helpers/logger');
const db = require('./db');
const app = require('./app');
const { PORT } = require('./common/config');

process.on('uncaughtException', error => {
  logger.error(error.message);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(reason.message);
});

db.connect();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
