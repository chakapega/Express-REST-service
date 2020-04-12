const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const { OK, NOT_FOUND, BAD_REQUEST } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(OK).json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).send('User not found');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;

    if (name && login && password) {
      const user = await userService.create({ name, login, password });

      res.json(User.toResponse(user));
    } else {
      res.status(BAD_REQUEST).send('Bad request');
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await userService.update(id, { name, login, password });

    if (user) {
      res.json(User.toResponse(user));
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
    const isRemoved = await userService.remove(id);

    if (isRemoved) {
      res.status(OK).send('The user has been deleted');
    } else {
      res.status(NOT_FOUND).send('User not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
