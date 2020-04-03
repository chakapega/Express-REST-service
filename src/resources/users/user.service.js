const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const create = user => usersRepo.create(user);
const getById = id => usersRepo.getById(id);
const update = (id, updatedUser) => usersRepo.update(id, updatedUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { create, getAll, getById, update, deleteUser };
