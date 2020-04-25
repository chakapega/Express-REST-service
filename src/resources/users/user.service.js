const userDbRepository = require('./user.db.repository');
const taskDbRepository = require('../tasks/task.db.repository');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../common/config');

const getAll = () => userDbRepository.getAll();

const getById = id => userDbRepository.getById(id);

const getByLogin = login => userDbRepository.getByLogin(login);

const create = async userData => {
  const { name, login, password } = userData;
  const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT_ROUNDS);

  return userDbRepository.create({ name, login, password: hashedPassword });
};

const update = userData => userDbRepository.update(userData);

const remove = async id => {
  const isRemoved = await userDbRepository.remove(id);

  if (isRemoved) {
    return await taskDbRepository.eraseUserIdAfterRemovingUser(id);
  }
};

module.exports = { getAll, getById, getByLogin, create, update, remove };
