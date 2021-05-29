const Note = require('../../schema/notes');
const User = require('../../schema/user');
const supertest = require('supertest');
const {app} = require('../../index');

const api = supertest(app);


const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

const getAllFromNotes = async () =>{
  let response = await api.get('/api/notes');
  return {
    contents: response.body.map(note => note.content),
    response
  };
};

const nonExistingId = async () => {
  let note = new Note({content: 'will remove this', date: new Date()});
  await note.save();
  await note.remove();
  
  return note._id;
};

const getUsers = async () => {
  let users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialNotes,
  api,
  getAllFromNotes,
  nonExistingId,
  getUsers,
};