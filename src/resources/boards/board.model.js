const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const Board = new Schema({
  _id: {
    type: String,
    default: uuid()
  },
  title: String,
  columns: Array
});

module.exports = model('Board', Board);
