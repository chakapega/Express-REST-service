const userMemoryRepository = require('./user.memory.repository');
const taskMemoryRepository = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = () => userMemoryRepository.getAll();

const getById = id => userMemoryRepository.getById(id);

const create = async ({ name, login, password }) => {
  const user = new User({ name, login, password });

  await userMemoryRepository.create(user);

  return user;
};

const update = async (id, { name, login, password }) => {
  await userMemoryRepository.update(id, { name, login, password });

  return await userMemoryRepository.getById(id);
};

const remove = async id => {
  let isRemoved = false;
  const user = await userMemoryRepository.getById(id);

  if (user) {
    await userMemoryRepository.remove(id);
    await taskMemoryRepository.eraseUserIdAfterRemovingUser(id);
    isRemoved = true;
  }

  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };
