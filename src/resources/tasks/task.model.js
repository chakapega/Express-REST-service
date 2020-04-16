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
  userId: Schema.Types.Mixed,
  boardId: Schema.Types.Mixed,
  columnId: Schema.Types.Mixed
});

module.exports = model('Task', Task);
