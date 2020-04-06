const boardMemoryRepository = require('./board.memory.repository');
const taskMemoryRepository = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = () => boardMemoryRepository.getAll();

const getById = id => boardMemoryRepository.getById(id);

const create = async ({ title, columns }) => {
  const board = new Board({ title, columns });

  await boardMemoryRepository.create(board);

  return board;
};

const update = async (id, { title, columns }) => {
  await boardMemoryRepository.update(id, { title, columns });

  return boardMemoryRepository.getById(id);
};

const remove = async id => {
  let isRemoved = false;
  const board = await boardMemoryRepository.getById(id);

  if (board) {
    await boardMemoryRepository.remove(id);
    await taskMemoryRepository.removeByBoardId(id);
    isRemoved = true;
  }

  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };
