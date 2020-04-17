const userDbRepository = require('./user.db.repository');
const taskDbRepository = require('../tasks/task.db.repository');

const getAll = () => userDbRepository.getAll();

const getById = id => userDbRepository.getById(id);

const create = userData => userDbRepository.create(userData);

const update = userData => userDbRepository.update(userData);

const remove = async id => {
  const isRemoved = await userDbRepository.remove(id);

  if (isRemoved) {
    return await taskDbRepository.eraseUserIdAfterRemovingUser(id);
  }
};

module.exports = { getAll, getById, create, update, remove };
