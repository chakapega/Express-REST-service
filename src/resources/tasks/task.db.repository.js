const Task = require('./task.model');

const getAllByBoardId = async boardId => Task.find({ boardId });

const create = taskData => Task.create(taskData);

const getByBoardIdAndTaskId = (boardId, _id) => Task.findOne({ boardId, _id });

const update = async taskData => {
  const { boardId, taskId: _id } = taskData;

  await Task.updateOne({ boardId, _id }, taskData);

  return getByBoardIdAndTaskId(boardId, _id);
};

const remove = async (boardId, _id) => {
  return (await Task.deleteOne({ boardId, _id })).ok;
};

// const removeAllByBoardId = async boardId => {
//   tasks = tasks.filter(task => {
//     if (task.boardId !== boardId) return task;
//   });
// };

// const eraseUserIdAfterRemovingUser = async userId => {
//   tasks.forEach(task => {
//     if (task.userId === userId) {
//       task.userId = null;
//     }
//   });
// };

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdAndTaskId,
  update,
  remove
  // removeAllByBoardId,
  // eraseUserIdAfterRemovingUser
};
