const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const Task = new Schema({
  _id: {
    type: String,
    default: uuid()
  },
  title: String,
  order: Number,
  description: String,
  userId: {
    type: Schema.Types.Mixed,
    default: null
  },
  boardId: {
    type: Schema.Types.Mixed,
    default: null
  },
  columnId: {
    type: Schema.Types.Mixed,
    default: null
  }
});

module.exports = model('Task', Task);
