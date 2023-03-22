const Note = require('../module/node')
const fetchNotes = async (req, res) => {
  const notes = await Note.find();
  res.json({ notes });
};

const fetchNote = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.json({ note });
};
const createNote = async (req, res) => {
  const {title,body} = req.body;

  const note = await Note.create({
    title,
    body
  });
  res.json({ note });
};
const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const {title,body} = req.body;
  await Note.findByIdAndUpdate(noteId, {
    title,
    body
  });
  //find updated node
  const note = await Note.findById(noteId);
  res.json({ note });
};
const deleteNote = async (req, res) => {
    try {
      const noteId = req.params.id;
      await Note.deleteOne({ _id: noteId });
  
      res.json({ success: `The Note with id ${noteId} was deleted ` });
    } catch (err) {
      res.json({ err: err });
    }
  };

  module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote

  }