const router = require('express').Router();
const taskService = require('./task.service');
const { OK, NOT_FOUND } = require('http-status-codes');

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const boardTasks = await taskService.getAllByBoardId(boardId);

    res.status(OK).json(boardTasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await taskService.create({
      boardId,
      title,
      order,
      description,
      userId,
      columnId
    });

    res.status(OK).json(task);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await taskService.getByBoardIdAndTaskId(boardId, taskId);

    if (task) {
      res.status(OK).json(task);
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const {
      id: newTaskId,
      title,
      order,
      description,
      userId: newUserId,
      boardId: newBoardId,
      columnId: newColumnId
    } = req.body;
    const task = await taskService.update({
      boardId,
      taskId,
      newTaskId,
      title,
      order,
      description,
      newUserId,
      newBoardId,
      newColumnId
    });

    res.status(OK).json(task);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const isRemoved = await taskService.remove(boardId, taskId);

    if (isRemoved) {
      res.status(OK).send('The task has been deleted');
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
