let users = [];

const getAll = async () => {
  return users;
};

const getById = async id => {
  return users.find(user => {
    if (user.id === id) return user;
  });
};

const create = async user => {
  users.push(user);
};

const update = async ({ id, name, login, password }) => {
  users.forEach(user => {
    if (user.id === id) {
      user.name = name || user.name;
      user.login = login || user.login;
      user.password = password || user.password;
    }
  });
};

const remove = async id => {
  users = users.filter(user => {
    if (user.id !== id) return user;
  });
};

module.exports = { getAll, getById, create, update, remove };
