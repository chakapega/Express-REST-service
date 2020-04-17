const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const User = new Schema(
  {
    _id: {
      type: String,
      default: uuid()
    },
    name: String,
    login: String,
    password: String
  },
  { versionKey: false }
);

User.statics.toResponse = user => {
  const { id, name, login } = user;

  return { id, name, login };
};

module.exports = model('User', User);
