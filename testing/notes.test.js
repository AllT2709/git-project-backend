const mogoose = require('mongoose');
const { server} = require('../index');
const Note = require('../schema/notes');

const {
  initialNotes, 
  api, 
  getAllFromNotes,
  nonExistingId
} = require('../utils/helpers/helper');


beforeEach(async () => {
  await Note.deleteMany({});

  for (const note of initialNotes) {
    const noteObject = new Note(note);
    await noteObject.save();
  }
});

describe('GET all notes', () => {

  test('there are some notes', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there are two notes', async () => {
    let response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length);
  });
  test('the first note is about HTTP methods', async ()=>{
    let response = await api.get('/api/notes');
    let content = response.body.map(note => note.content);
    expect(content).toContain('HTML is easy');
  });
});

describe('GET notes for id', () => {
  test('there are a note', async () => {
    let {response,contents} = await getAllFromNotes();
    let noteToSend = response.body[0];

    await api
      .get(`/api/notes/${noteToSend.id}`)
      .expect(200);
      
    expect(contents).toContain(noteToSend.content);
  });

  test('cannot be found and send this malformatted id', async () => {
    await api 
      .get('/api/notes/1234')
      .expect(400);

    let {response} = await getAllFromNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test('not found this id', async () => {
    let falseId = await nonExistingId();

    await api
      .get(`/api/notes/${falseId}`)
      .expect(404);

    let {response} = await getAllFromNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });
});

describe('POST notes', () => {
  test('a valid note can be added', async () =>{
    let newNote = {
      content: 'esta es una nueva nota',
      important: false,
    };
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    let {contents, response} = await getAllFromNotes();
    expect(response.body).toHaveLength(initialNotes.length + 1);
    expect(contents).toContain(newNote.content);
  
  });
  
  test('note without content is not added', async () =>{
    let newNote = {
      important: false,
    };
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400);
  
    let {response} = await getAllFromNotes();
    
    expect(response.body).toHaveLength(initialNotes.length);
  
  });
});

describe('PUT notes', () => {
  test('the note has been updated', async () => {
    let note = {
      content: 'Nota recargada'
    };

    let {response} = await getAllFromNotes();
    let noteToUpdate = response.body[0];

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(note)
      .expect(202);

    let {contents} = await getAllFromNotes();
    expect(contents).toContain(note.content);
  });

  test('note without content is not updated', async () =>{
    let note = {};

    let {response} = await getAllFromNotes();
    let noteToUpdate = response.body[0];

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(note)
      .expect(400);
  
    let {contents} = await getAllFromNotes();
    
    expect(contents).not.toContain(note);
  
  });

  test('cannot be update and send this malformatted id', async () => {
    let note = {
      content: 'Nota recargada'
    };

    await api 
      .put('/api/notes/1234')
      .send(note)
      .expect(400);

    let {contents} = await getAllFromNotes();
    expect(contents).not.toContain(note);
  });

  test('not found this id', async () => {
    let falseId = await nonExistingId();
    let note = {
      content: 'Nota recargada'
    };
    await api
      .get(`/api/notes/${falseId}`)
      .send(note)
      .expect(404);

    let {contents} = await getAllFromNotes();
    expect(contents).not.toContain(note);
  });
});

describe('DELETE notes', () => {
  test('a note can be deleted', async () => {
    let {response: firstRes} = await getAllFromNotes();
    console.log(firstRes);
    let noteToDelete = firstRes.body[0];
  
    await api 
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);
  
    let {contents, response: secondRes} = await getAllFromNotes();
    expect(secondRes.body).toHaveLength(initialNotes.length - 1);
    expect(contents).not.toContain(noteToDelete.content);
    
  });
  
  test('a note that do not exist cannot be deleted', async () => {
  
    await api 
      .delete('/api/notes/1234')
      .expect(400);
  
    let { response } = await getAllFromNotes();  
    expect(response.body).toHaveLength(initialNotes.length);
    // expect(contents).not.toContain(noteToDelete.content);
    
  });
});

afterAll(()=>{
  mogoose.connection.close();
  server.close();
});