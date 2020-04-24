const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const logger = require('../helpers/logger');

const createAdmin = async () => {
  const admin = { name: 'Vadim', login: 'admin', password: 'admin' };

  return await User.create(admin);
};

const connect = (MONGO_CONNECTION_STRING, cb) => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(async () => {
      console.log('MongoDB connected');
      await mongoose.connection.dropDatabase();
      await createAdmin();
      cb();
    })
    .catch(error => {
      process.exitCode = 1;
      logger.error(`MongoDB error: ${error.message}`);
    });
};

module.exports = { connect };
