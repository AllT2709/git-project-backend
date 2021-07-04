const notesModel = require('../schema/notes');

const getNotes =  async () =>{
  const notes = await notesModel.find({}).populate('user',{ username:1 , name: 1});
  return notes;
};

const getNoteById = async (id) =>{
  const note = await notesModel.findById({_id:id});
  return note;
};

const addNote = async (note) => {
  const newNote = await new notesModel(note).save();
  return newNote;
};

const updateNote = async (id,data) => {
  let noteUpdated = await notesModel.findByIdAndUpdate(id, data,{
    new:true,
    useFindAndModify: false
  });
  return noteUpdated;
};

const deleteNote = async (id) => {
  let noteDeleted = await notesModel.findByIdAndDelete({_id: id});
  return noteDeleted;
};
module.exports = {
  getNotes,
  addNote,
  getNoteById,
  deleteNote,
  updateNote,
};