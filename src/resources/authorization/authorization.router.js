const authorizationRouter = require('express').Router();
const catchError = require('../../helpers/catchError');
const authorizationService = require('./authorization.service');
const { OK, FORBIDDEN } = require('http-status-codes');

authorizationRouter.route('/login').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const potentialUser = await authorizationService.getUserByLoginAndPassword({
      login,
      password
    });

    if (potentialUser) {
      const token = authorizationService.signIn(potentialUser);

      res.status(OK).json({ token });
    } else {
      res.status(FORBIDDEN).send('Incorrect login or password');
    }
  })
);

module.exports = authorizationRouter;
