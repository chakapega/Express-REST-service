const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { OK, NOT_FOUND, BAD_REQUEST } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    res.status(OK).json(boards);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardService.getById(id);

    if (board) {
      res.status(OK).json(board);
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = req.body;
    const board = await boardService.create({ title, columns });

    res.status(OK).json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, columns } = req.body;

    if (title && columns) {
      const potentialBoard = await boardService.getById(id);

      if (potentialBoard) {
        const board = await boardService.update({ id, title, columns });

        res.status(OK).json(board);
      } else {
        res.status(NOT_FOUND).send('Board not found');
      }
    } else {
      res.status(BAD_REQUEST).send('Bad request');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const potentialBoard = await boardService.getById(id);

    if (potentialBoard) {
      const isRemoved = await boardService.remove(id);

      if (isRemoved) {
        res.status(OK).send('The board has been deleted');
      }
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
