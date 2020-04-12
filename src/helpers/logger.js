const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'error'
    }),
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info'
    })
  ]
});

module.exports = logger;
