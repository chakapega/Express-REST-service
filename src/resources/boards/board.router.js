const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.getById(id);

  if (board) {
    res.json(board);
  } else {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;

  if (title && columns) {
    const board = await boardService.create({ title, columns });

    res.json(board);
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;

  if (title && columns) {
    const board = await boardService.update(id, { title, columns });

    res.json(board);
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const isRemoved = await boardService.remove(id);

  if (isRemoved) {
    res.status(200).send('The board has been deleted');
  } else {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
