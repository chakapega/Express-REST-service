const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const logger = require('../common/logger');
const bcrypt = require('bcrypt');
const bcryptSaltRounds = 10;

const createAdmin = async () => {
  const admin = { name: 'Vadim', login: 'admin' };
  const adminPassword = 'admin';
  const hashedPassword = await bcrypt.hash(adminPassword, bcryptSaltRounds);

  admin.password = hashedPassword;

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
      logger.error(`MongoDB error: ${error.message}`);
      process.exitCode = 1;
    });
};

module.exports = { connect };
