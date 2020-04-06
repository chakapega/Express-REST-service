let tasks = [];

const getAllByBoardId = async boardId => {
  return tasks.map(task => {
    if (task.boardId === boardId) return task;
  });
};

const create = async task => {
  tasks.push(task);
};

const getByBoardIdAndTaskId = (boardId, taskId) => {
  return tasks.find(task => {
    if (task.boardId === boardId && task.id === taskId) return task;
  });
};

const update = async (
  boardId,
  taskId,
  { newId, title, order, description, newUserId, newBoardId, newColumnId }
) => {
  tasks.forEach(task => {
    if (task.boardId === boardId && task.id === taskId) {
      task.id = newId;
      task.title = title;
      task.order = order;
      task.description = description;
      task.userId = newUserId;
      task.boardId = newBoardId;
      task.columnId = newColumnId;
    }
  });
};

const remove = async (boardId, taskId) => {
  tasks = tasks.filter(task => {
    if (task.boardId !== boardId && task.id !== taskId) return task;
  });
};

const removeByBoardId = async boardId => {
  tasks = tasks.filter(task => {
    if (task.boardId !== boardId) return task;
  });
};

const eraseUserIdAfterRemovingUser = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdAndTaskId,
  update,
  remove,
  removeByBoardId,
  eraseUserIdAfterRemovingUser
};
