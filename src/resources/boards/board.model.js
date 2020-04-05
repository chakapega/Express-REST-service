const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    if (columns.length) {
      this.columns = columns.map(column => {
        /* eslint-disable */
        const { title, order } = column;
        /* eslint-enable */

        return new Column({ title, order });
      });
    } else {
      this.columns = columns;
    }
  }
}

module.exports = Board;
