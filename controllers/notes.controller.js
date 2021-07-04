const store = require('../store/notesStore');

const getNotes =  () =>{
  return new Promise((resolve)=>{
    resolve(store.getNotes());
  });
};

const getNoteById = async (id) =>{
  let data = await store.getNoteById(id);
  return data;
};

const addNote = (note) =>{
  return new Promise((resolve,reject)=>{
    if(!note){
      reject('error with post method');
    }
    resolve(store.addNote(note));
  });
};

const updateNote = async (id,data) => {
  return await store.updateNote(id,data);
};

const deleteNote = (id) => {
  return new Promise((resolve,reject)=>{
    if (!id) {
      reject('error with deleted method');
    }
    resolve(store.deleteNote(id));
  });
};

module.exports = {
  getNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote
};
