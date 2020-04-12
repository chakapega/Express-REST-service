const logger = require('../helpers/logger');

const requestsLogger = (req, res, next) => {
  logger.info(
    `Url: ${req.url}, Params: ${JSON.stringify(
      req.params
    )}, Query parameters: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(
      req.body
    )}`
  );

  next();
};

module.exports = requestsLogger;
