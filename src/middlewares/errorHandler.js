const logger = require('../helpers/logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }

  next();
};

module.exports = errorHandler;
