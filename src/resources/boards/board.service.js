const boardMemoryRepository = require('./board.memory.repository');
const taskMemoryRepository = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = () => boardMemoryRepository.getAll();

const getById = id => boardMemoryRepository.getById(id);

const create = async boardData => {
  const board = new Board({ ...boardData });

  await boardMemoryRepository.create(board);

  return board;
};

const update = async boardData => {
  const { newId } = boardData;

  await boardMemoryRepository.update({ ...boardData });

  return boardMemoryRepository.getById(newId);
};

const remove = async id => {
  let isRemoved = false;
  const board = await boardMemoryRepository.getById(id);

  if (board) {
    await boardMemoryRepository.remove(id);
    await taskMemoryRepository.removeAllByBoardId(id);
    isRemoved = true;
  }

  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };
