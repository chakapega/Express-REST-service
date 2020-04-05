const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  if (name && login && password) {
    const user = await userService.create({ name, login, password });

    res.json(User.toResponse(user));
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const user = await userService.update(id, { name, login, password });

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const isRemoved = await userService.remove(id);

  if (isRemoved) {
    res.status(204).send('The user has been deleted');
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
