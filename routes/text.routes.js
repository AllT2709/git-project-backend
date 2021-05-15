const express = require('express');
const route = express.Router();
let notes = require('../store/dummy');

const generateID = () =>{
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id))
    : 0;
  return maxId + 1;
};
route.get('/notes', (req, res) => {
  res.json(notes);
});
route.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id == id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).json('message not found');
  }
});
route.post('/notes',(req,res)=>{
  const body = req.body;
  if ( !body || !body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const newNote = {
    content: body.content,
    important: typeof body.important !== 'undefined' ? body.important : false,
    date: new Date(),
    id: generateID(),
  };
  // notes = notes.push(newNote) tambien funciona con push y sin la asignacion
  // notes = notes.concat(newNote) tambien es valido
  notes= [...notes, newNote];
  console.log(notes);
  res.json({
    message: 'post note success',
    notes: notes
  });
});
route.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  //   const note = notes.find(note => note.id == id);
  notes = notes.filter(note => note.id !== id);
  res.json(notes);

  /**Esta forma tambien funciona**/
  // if (note) {
  //     const index = notes.indexOf(note);

  //     notes.splice(index, 1)
  //     console.log(notes);

  //     res.json('message deleted!')
  // } else {
  //     res.json('message not exist')
  // }
});

module.exports = route;