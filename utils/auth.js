const fs = require("fs");

// read persisted data from file
var getUsers = () => {
  try {
    var usersString = fs.readFileSync("./data/users.json");
    return JSON.parse(usersString);
  } catch (err) {
    return [];
  }
};

var saveUsers = users => {
  fs.writeFileSync("./data/users.json", JSON.stringify(users));
};

var insertUser = (username, email, password) => {
  var users = getUsers();

  var user = {
    username,
    password,
    email
  };

  var duplicateUsers = users.filter(user => {
    return user.username === username;
  });

  if (duplicateUsers.length === 0) {
    users.push(user);
    saveUsers(users);
    return user;
  }
};

var authUser = (username, password) => {
  var users = getUsers();
  var filteredUsers = users.filter(
    user => user.username === username && user.password === password
  );
  return filteredUsers[0];
};

module.exports = {
  insertUser,
  authUser
};
