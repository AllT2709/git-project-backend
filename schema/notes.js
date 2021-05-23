const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const noteModel = model('Note', noteSchema);

module.exports = noteModel;