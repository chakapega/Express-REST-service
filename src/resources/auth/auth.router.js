const authRouter = require('express').Router();
const catchError = require('../../helpers/catchError');
const authService = require('./auth.service');
const { OK, FORBIDDEN } = require('http-status-codes');

authRouter.route('/login').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const potentialUser = await authService.getUserByLoginAndPassword({
      login,
      password
    });

    if (potentialUser) {
      const token = authService.signIn(potentialUser);

      res.status(OK).json({ token, message: 'Successful login' });
    } else {
      res.status(FORBIDDEN).send('Incorrect login or password');
    }
  })
);

module.exports = authRouter;
