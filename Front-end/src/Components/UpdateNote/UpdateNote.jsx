import React, { useRef, useContext } from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noteContext from "../../Context/notes/notesConstext";

const UpdateNote = (props) => {
const { dark, buttonOneRef, updateNote } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
      const { updateNoteUi } = useContext(noteContext);
const {note, setNote} = props
    const handleClick = () => {
      setShow(true);
    };
    const onchange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
      
    };
    const handleSubmitClick =async () => {
      await updateNoteUi(note.id, note.title, note.description, note.tags)
      setShow(false);
    };
  return (
    <div>
      <Button
        variant=" my-3 primary"
        ref={buttonOneRef}
        onClick={handleClick}
        className="d-none"
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className={`text-${dark ? "light" : "dark"} bg-${
            dark ? "dark" : "light"
          }`}
        >
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`text-${dark ? "light" : "dark"} bg-${
            dark ? "dark" : "light"
          }`}
        >
          <Container
            className={`text-${dark ? "light" : "dark"} bg-${
              dark ? "dark" : "light"
            }`}
          >
            <h1>Add Note</h1>
            <Form>
              <Form.Group className={`text-${dark ? "light" : "dark"}`}>
                <Form.Label
                  className={`text-${dark ? "light" : "dark"}`}
                  htmlFor="title"
                >
                  Add Title
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  id="title"
                  name="title"
                  value={note.title}
                  placeholder="Add title..."
                  onChange={onchange}
                  className={`bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                  htmlFor="description"
                >
                  Add Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  name="description"
                  id="description"
                  value={note.description}
                  placeholder="Add Description..."
                  onChange={onchange}
                  className={` bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                  htmlFor="tags"
                >
                  Add Tags
                </Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  id="tags"
                  value={note.tags}
                  placeholder="Add tags..."
                  onChange={onchange}
                  className={` bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer
          className={` text-${dark ? "light" : "dark"} bg-${
            dark ? "dark" : "light"
          }`}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateNote;
