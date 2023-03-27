import axios from "axios";
import create from "zustand";

const notesStore = create((set) => ({
  notes: null,
  createForm: {
    title: " ",
    body: " ",
  },
  updateForm: {
    _id: null,
    title: " ",
    body: " ",
  },
  fetchNotes: async () => {
    const res = await axios.get("/notes");
    set({
      notes: res.data.notes,
    });
  },
  updateCreateForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },
  createNote: async (e) => {
    e.preventDefault();
    const { createForm, notes } = notesStore.getState();
    const res = await axios.post("/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: { title: "", body: "" },
    });
  },
  deleteNote: async (_id) => {
    const res = await axios.delete(`/notes/${_id}`);
    const { notes } = notesStore.getState();
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    set({ notes: newNotes });
  },
  handleUpdate: (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },
  toogleUpdate: ({_id, title, body}) => {
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },
  updateNote: async (e) => {
    e.preventDefault();
    const {
      updateForm: { title, body, _id },
      notes,
    } = notesStore.getState();

    const res = await axios.put(`/notes/${_id}`, {
      title,
      body,
    });
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;
    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
}));

export default notesStore;
