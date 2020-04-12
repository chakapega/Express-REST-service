const taskMemoryRepository = require('./task.memory.repository');
const Task = require('./task.model');

const getAllByBoardId = boardId =>
  taskMemoryRepository.getAllByBoardId(boardId);

const create = async taskData => {
  const task = new Task({ ...taskData });

  await taskMemoryRepository.create(task);

  return task;
};

const getByBoardIdAndTaskId = (boardId, taskId) =>
  taskMemoryRepository.getByBoardIdAndTaskId(boardId, taskId);

const update = async taskData => {
  const { newBoardId, newTaskId } = taskData;

  await taskMemoryRepository.update({ ...taskData });

  return await getByBoardIdAndTaskId(newBoardId, newTaskId);
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
