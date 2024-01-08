import React, { useContext, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import "./Noteitems.css"
import noteContext from "../../Context/notes/notesConstext";
const NoteItems = (props) => {
  const { note, buttonOneRef, updateNote } = props;
      const { deleteNote } = useContext(noteContext);
      const handleDelete = () =>{
        deleteNote(note._id);
      }
  const handleClick = () => {
    updateNote(note);
      buttonOneRef.current.click();
    }

  return (
    <div className="my-4">
      <Card
        style={{}}
        className={`shadow mb-3 bg-${props.dark ? "dark" : "light"} text-${
          props.dark ? "light" : "dark"
        } hover-animation`}
        // className="bg-dark text-light"
      >
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <i
            className="fa-regular fa-trash-can mx-2 fa-lg"
            style={{ color: "red" }}
            onClick={handleDelete}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2 fa-lg"
            style={{ color: "green" }}
            onClick={handleClick}
          ></i>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItems;
