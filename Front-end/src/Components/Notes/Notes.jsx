import React, { useContext, useEffect, useState, useRef } from "react";
import NoteItems from "../NoteItems/NoteItems";
import noteContext from "../../Context/notes/notesConstext";
import { Col, Row } from "react-bootstrap";
import AddNote from "../AddNote/AddNote";
import UpdateNote from "../UpdateNote/UpdateNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const {dark} = props
      const { notes, getAllNotes } = useContext(noteContext);
      const [note, setNote] = useState({
        id:"",
        title: "",
        description: "",
        tags: "defaut",
      });
  const updateNote = (currentNote) =>{
    setNote({id:currentNote._id,title:currentNote.title, description:currentNote.description, tags:currentNote.tags})
  }
    const buttonOneRef = useRef(null)
    const handleButtonClick = () => {
        buttonOneRef.current.click();
    };
    const navigate = useNavigate()
useEffect(() => {
  if(localStorage.getItem('token')){
    getAllNotes()
  }
  else{navigate('/login')}
}, []);
  return (
    <>
      <AddNote dark={dark} note={note} setNote={setNote} />
      <UpdateNote
        note={note}
        setNote={setNote}
        dark={dark}
        handleButtonClick={handleButtonClick}
        buttonOneRef={buttonOneRef}
        updateNote={updateNote}
      />
      <h1 className={`text-${dark ? "light" : "dark"} my-4`}>
        Your Notes
      </h1>
      <Row>
        <div className={`container my-3 text-${dark ? "light" : "dark"} my-4`}>
          {notes.length === 0 && "No note to display..."}
        </div>
        {notes.map((note) => (
          <Col md={4}>
            <NoteItems
              handleButtonClick={handleButtonClick}
              buttonOneRef={buttonOneRef}
              key={note._id}
              note={note}
              dark={dark}
              updateNote={updateNote}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Notes;
