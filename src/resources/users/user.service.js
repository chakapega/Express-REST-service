const userDbRepository = require('./user.db.repository');
// const taskMemoryRepository = require('../tasks/task.memory.repository');

const getAll = () => userDbRepository.getAll();

const getById = id => userDbRepository.getById(id);

const create = userData => userDbRepository.create(userData);

const update = userData => userDbRepository.update(userData);

const remove = async id => {
  const isRemoved = await userDbRepository.remove(id);

  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };
