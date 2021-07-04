const User = require('../schema/user');

const getUsers = async () => {
  let users = await User.find({}).populate('notes',{ content: 1, data: 1});
  return users;
};

const getOneUser = async (data) => {
  let user = await User.findOne(data);
  return user;
};

const postUser = async (newUser) => {
  let user = new User(newUser);
  let userSaved = await user.save();
  return userSaved;
};

module.exports = {
  getUsers,
  postUser,
  getOneUser
};