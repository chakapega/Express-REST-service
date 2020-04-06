const router = require('express').Router();
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;

  const boardTasks = await taskService.getAllByBoardId(boardId);

  res.json(boardTasks);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;

  const task = await taskService.create(boardId, {
    title,
    order,
    description,
    userId,
    columnId
  });

  res.json(task);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;

  const task = await taskService.getByBoardIdAndTaskId(boardId, taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const {
    id: newId,
    title,
    order,
    description,
    userId: newUserId,
    boardId: newBoardId,
    columnId: newColumnId
  } = req.body;

  const task = await taskService.update(boardId, taskId, {
    newId,
    title,
    order,
    description,
    newUserId,
    newBoardId,
    newColumnId
  });

  res.json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;

  const isRemoved = await taskService.remove(boardId, taskId);

  if (isRemoved) {
    res.status(200).send('The task has been deleted');
  } else {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
