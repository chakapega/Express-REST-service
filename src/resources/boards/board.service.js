const boardDbRepository = require('./board.db.repository');
const Column = require('../columns/column.model');
// const taskMemoryRepository = require('../tasks/task.memory.repository');

const getAll = () => boardDbRepository.getAll();

const getById = id => boardDbRepository.getById(id);

const create = boardData => {
  const { columns } = boardData;
  const columnsWithId = columns.map(column => new Column(column));

  boardData.columns = columnsWithId;

  return boardDbRepository.create(boardData);
};

const update = boardData => boardDbRepository.update(boardData);

const remove = async id => {
  const isRemoved = await boardDbRepository.remove(id);

  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };
