const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', colums = [] } = {}) {
    this.id = id;
    this.title = title;
    this.colums = colums;
  }
}

module.exports = Board;
