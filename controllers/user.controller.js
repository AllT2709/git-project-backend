const store = require('../store/userStore');
const bcrypt = require('bcrypt');
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const getUsers = () => {
  return store.getUsers();
};

const getOneUser = async (res,body) => {
  let user = await store.getOneUser({username: body.username});
  let correctPass = user === null
    ? false 
    : await bcrypt.compare(body.password, user.password);

  if(!(user && correctPass)){
    return  res.status(401).json({
      error: 'invalid username or password',
    });
  }

  let userForToken = {
    username: user.username,
    id: user._id
  };

  let token = jwt.sign(userForToken, config.secret,);
  return {
    token,
    user
  };
};

const postUser = async (body) => {
  let passwordHashed = await bcrypt.hash(body.password,6);
  let newUser = {
    username: body.username,
    name: body.name,
    password: passwordHashed
  };

  return store.postUser(newUser);
};

module.exports = {
  getUsers,
  postUser,
  getOneUser
};