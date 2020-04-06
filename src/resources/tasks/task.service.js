const taskMemoryRepository = require('./task.memory.repository');
const Task = require('./task.model');

const getAllByBoardId = boardId =>
  taskMemoryRepository.getAllByBoardId(boardId);

const create = async (
  boardId,
  { title, order, description, userId, columnId }
) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  await taskMemoryRepository.create(task);

  return task;
};

const getByBoardIdAndTaskId = (boardId, taskId) =>
  taskMemoryRepository.getByBoardIdAndTaskId(boardId, taskId);

const update = async (
  boardId,
  taskId,
  { newId, title, order, description, newUserId, newBoardId, newColumnId }
) => {
  await taskMemoryRepository.update(boardId, taskId, {
    newId,
    title,
    order,
    description,
    newUserId,
    newBoardId,
    newColumnId
  });

  return await getByBoardIdAndTaskId(newBoardId, newId);
};

const remove = async (boardId, taskId) => {
  let isRemoved = false;
  const task = await getByBoardIdAndTaskId(boardId, taskId);

  if (task) {
    await taskMemoryRepository.remove(boardId, taskId);
    isRemoved = true;
  }

  return isRemoved;
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdAndTaskId,
  update,
  remove
};
