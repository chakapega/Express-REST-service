let boards = [];

const getAll = async () => {
  return boards;
};

const getById = async id => {
  return boards.find(board => {
    if (board.id === id) return board;
  });
};

const create = async board => {
  boards.push(board);
};

const update = async (id, { title, columns }) => {
  boards.forEach(board => {
    if (board.id === id) {
      board.title = title;
      board.columns = columns;
    }
  });
};

const remove = async id => {
  boards = boards.filter(board => {
    if (board.id !== id) return board;
  });
};

module.exports = { getAll, getById, create, update, remove };
