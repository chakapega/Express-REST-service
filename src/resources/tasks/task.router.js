const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
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
      title,
      order,
      description,
      boardId,
      userId,
      columnId
    });

    res.status(OK).json(Task.toResponse(task));
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
    const { title, order, description, columnId } = req.body;
    const potentialTask = await taskService.getByBoardIdAndTaskId(
      boardId,
      taskId
    );

    if (potentialTask) {
      const task = await taskService.update({
        title,
        order,
        description,
        boardId,
        taskId,
        columnId
      });

      res.status(OK).json(task);
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const potentialTask = await taskService.getByBoardIdAndTaskId(
      boardId,
      taskId
    );

    if (potentialTask) {
      const isRemoved = await taskService.remove(boardId, taskId);

      if (isRemoved) {
        res.status(OK).send('The task has been deleted');
      }
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
