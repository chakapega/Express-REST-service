let users = [];

const getAll = async () => {
  return users;
};

const create = async user => {
  users.push(user);
};

const getById = async id => {
  return users.find(user => {
    if (user.id === id) return user;
  });
};

const update = async (id, updatedUser) => {
  users.forEach(user => {
    if (user.id === id) {
      const { name, login, password } = updatedUser;

      user.name = name;
      user.login = login;
      user.password = password;
    }
  });

  return await getById(id);
};

const deleteUser = async id => {
  users = users.filter(user => {
    if (user.id !== id) return user;
  });
};

module.exports = { create, getAll, getById, update, deleteUser };
