const express = require("express");
const router = express.Router();

const notesController = require('./controllers/notesController')
//post Node
router.route("/").post(notesController.createNote).get(notesController.fetchNotes);
//Get Node
// router.route("/").get()
//Get Node by id
router.route("/:id").get(notesController.fetchNote).delete(notesController.deleteNote).put(notesController.updateNote);

// router.route("/:id").put()
// router.route("/:id").delete();

module.exports = router;
