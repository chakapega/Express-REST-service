const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  if (name && login && password) {
    const user = new User({ name, login, password });

    await usersService.create(user);

    res.json(User.toResponse(user));
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const user = await usersService.update(id, { name, login, password });
  console.log(user);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  await usersService.deleteUser(id);

  res.send('The user has been deleted');
});

module.exports = router;
