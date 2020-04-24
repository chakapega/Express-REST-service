const userService = require('../users/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getUserByLoginAndPassword = async userData => {
  const { login, password } = userData;
  const potentialUser = await userService.getByLogin(login);

  if (potentialUser) {
    const { password: hashedPassword } = potentialUser;
    const isMatchPassword = await bcrypt.compare(password, hashedPassword);

    if (isMatchPassword) return potentialUser;
  }

  return;
};

const signIn = userData => {
  const { _id, login } = userData;
  const token = jwt.sign({ _id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });

  return token;
};

module.exports = { getUserByLoginAndPassword, signIn };
