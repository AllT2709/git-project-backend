const express = require('express');
const route = express.Router();

require('express-async-errors');

// let notes = require('../database/dummy');
const controller = require('../controllers/notes.controller');

route.get('/notes', async (req, res) => {
  let notes = await controller.getNotes();
  res.json(notes);
});
route.get('/notes/:id', async (req, res) => {
  const id = req.params.id;

  const note = await controller.getNoteById(id);
  if(note){
    console.log(note);
    res.json(note);
  }else{
    res.status(404).json('not found');
  }
}); 

route.post('/notes', async (req,res)=>{
  const body = req.body;
  if ( !body || !body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const newNote = {
    content: body.content,
    date: new Date(),
    important: typeof body.important !== 'undefined' ? body.important : false,
  };

  const note = await controller.addNote(newNote);
  res.status(201).json({
    message: 'save success',
    note: note,
  });
});

route.put('/notes/:id', async (req,res) => {
  let {id} = req.params;
  let body = req.body;

  if ( !req.body || !req.body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const noteToUpdate = {
    content: body.content,
  };
  
  if(typeof body.important !== 'undefined'){
    noteToUpdate.important = body.important;
  }

  let noteUpdated = await controller.updateNote(id,noteToUpdate);
  console.log(noteUpdated);
  res.status(202).json({
    message: 'updated successfully',
    note: noteUpdated
  });
  
});

route.delete('/notes/:id', async (req, res) => {
  let id = req.params.id;

  await controller.deleteNote(id);
  res.status(204).end();
 
});

module.exports = route;