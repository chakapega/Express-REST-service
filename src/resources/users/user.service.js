const userDbRepository = require('./user.db.repository');
const taskDbRepository = require('../tasks/task.db.repository');
const bcrypt = require('bcrypt');
const bcryptSaltRounds = 10;

const getAll = () => userDbRepository.getAll();

const getById = id => userDbRepository.getById(id);

const create = async userData => {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);

  // eslint-disable-next-line require-atomic-updates
  userData.password = hashedPassword;

  return userDbRepository.create(userData);
};

const update = userData => userDbRepository.update(userData);

const remove = async id => {
  const isRemoved = await userDbRepository.remove(id);

  if (isRemoved) {
    return await taskDbRepository.eraseUserIdAfterRemovingUser(id);
  }
};

module.exports = { getAll, getById, create, update, remove };
