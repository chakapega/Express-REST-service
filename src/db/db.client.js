const mongoose = require('mongoose');
const logger = require('../helpers/logger');

const connect = (MONGO_CONNECTION_STRING, cb) => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB connected');
      mongoose.connection.dropDatabase();
      cb();
    })
    .catch(error => {
      process.exitCode = 1;
      logger.error(`MongoDB error: ${error.message}`);
    });
};

module.exports = { connect };
