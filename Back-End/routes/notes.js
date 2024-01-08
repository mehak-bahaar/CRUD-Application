const express = require("express");
const router = express.Router();
const Notes = require("../modules/Notes");
const fetchUserDets = require("../middleware/FetchUserDets");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// ROUTE 1: to fetch notes using GET /api/notes/allNotes (login required)
router.get("/allNotes", fetchUserDets, async (req, res) => {
  const notes = await Notes.find({user: req.user.id});
  res.json(notes);
  console.log(notes , 'from backend')
});
// ROUTE 2: to add new notes using POST /api/notes/addNote (login required)
router.post(
  "/addNote",
  fetchUserDets,
  [
    // Validation for title and description
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Resolve errors if field is empty
      const result = validationResult(req);
      const {title, description, tag} = req.body
      try {
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
      try {
        const note = new Notes({
          title,
          description,
          tag,
          user: req.user.id,
        });
        const savedNote = await note.save();
        res.json(savedNote);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    }
);

// ROUTE 3: to update a note using Put /api/notes/updateNote:id (login required)
router.put("/updateNote/:id", fetchUserDets, async (req, res) => {
  //create new note
  const noteId = req.params.id;
  try {
    const { title, description, tag } = req.body;
    const newNote = { title: "", description: "", tag: "" };
    //checking the fields are not empty or null
    if (title) {
      // console.log(title); //to debug
      newNote.title = title;
    }
    if (description) {
      // console.log(description);//to debug
      newNote.description = description;
    }
    if (tag) {
      // console.log(tag);//to debug
      newNote.tag = tag;
    }
    //if any of them is null then send error message
    if (!title || !description) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    //find the note in database with given id
    let note = await Notes.findById(noteId);
    console.log(note, 'from backend')//to debug
    if (!note) {
      console.error('note not found')
      return res.status(404).send("Note Not Found");
    }
    //make sure the logged-in user owns this note
    if (note.user != req.user.id) {
      return res.status(401).json({ msg: "You can only edit your notes." });
    }
    note = await Notes.findByIdAndUpdate(noteId, { ...newNote }, { new: true });
    console.log(note, noteId , 'from backend')
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
  
});
// ROUTE 4: to delete a note using Delete /api/notes/deleteNote:id (login required)
router.delete("/deleteNote/:id", fetchUserDets, async (req, res) => {
  //create new note
  const noteId = req.params.id;
  try{
  //find the note in database with given id
  let note = await Notes.findById(noteId);
  console.log(note , 'from backend')
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //make sure the logged-in user owns this note
  if (note.user != req.user.id) {
    return res.status(401).json({ msg: "You can only edit your notes." });
  }
  note = await Notes.findByIdAndDelete(noteId);
  res.json({ msg:`this note has been deleted` });
  
}catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
