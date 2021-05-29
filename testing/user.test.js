const mogoose = require('mongoose');
const { server} = require('../index');
const bcrypt = require('bcrypt');
const User = require('../schema/user');
const {api,getUsers}= require('../utils/helpers/helper');

describe('Testing user endpoints when there is one user in db', () => {
  beforeEach( async () => {
    await User.deleteMany({});

    let passwordHashed = await bcrypt.hash('pass123',6);
    let user = new User({
      username:'admin123',
      name: 'Admin',
      password: passwordHashed
    });

    await user.save();
  });
  describe('GET users', () => {
    test('getting all users from db', async () => {
      let initialUsers = await getUsers();

      let response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialUsers.length);

    });
  });
  describe('POST user', () => {
    test('Creating a new user must be successful', async () => {
      let userAtStart = await getUsers();

      let newUser = {
        username: 'allt',
        name:'Aldo',
        password: 'aldo123'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      let userAtEnd = await getUsers();
      expect(userAtEnd).toHaveLength(userAtStart.length + 1);

      let usernames = userAtEnd.map(user => user.username);
      expect(usernames).toContain(newUser.username);
    });
    test('creation fails if username already taken', async () => {
      let userAtStart = await getUsers();

      let newUser = {
        username:'admin123',
        name: 'Aldo',
        password: 'admin123'
      };
      let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      let userAtEnd = await getUsers();
      expect(userAtEnd).toHaveLength(userAtStart.length);
    });
  });

  describe('POST user login', () => {
    test('loggeding user must return a token', async () => {

      let loggUser = {
        username:'admin123',
        password: 'pass123'
      };

      let response = await api
        .post('/api/login')
        .send(loggUser)
        .expect(200);

      console.log( response);
      expect(response.text).toContain('token');
    });
  });

  afterAll(()=>{
    mogoose.connection.close();
    server.close();
  });
});
