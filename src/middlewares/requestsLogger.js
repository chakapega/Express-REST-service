const logger = require('../helpers/logger');

const requestsLogger = (req, res, next) => {
  logger.info(
    `method: ${req.method}, url: ${req.url}, query parameters: ${JSON.stringify(
      req.query
    )}, body: ${JSON.stringify(req.body)}`
  );

  next();
};

module.exports = requestsLogger;
