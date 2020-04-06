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
  { newTaskId, title, order, description, newUserId, newBoardId, newColumnId }
) => {
  tasks.forEach(task => {
    if (task.boardId === boardId && task.id === taskId) {
      task.id = newTaskId || task.id;
      task.title = title || task.title;
      task.order = order || task.order;
      task.description = description || task.description;
      task.userId = newUserId || task.userId;
      task.boardId = newBoardId || task.boardId;
      task.columnId = newColumnId || task.columnId;
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
