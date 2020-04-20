const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../helpers/logger');

const connect = () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB connected');
      mongoose.connection.dropDatabase();
    })
    .catch(error => logger.error(`MongoDB error: ${error.message}`));
};

module.exports = { connect };
