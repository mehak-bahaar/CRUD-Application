import React, { useState, useContext } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import noteContext from "../../Context/notes/notesConstext";


const AddNote = (props) => {
  const { addNote } = useContext(noteContext);
  const { note, setNote } = props;
  const handelAddNote = async (event) => {
    event.preventDefault();
    setShow(false);
    if (note.title === "" || note.description === "") {
      return; 
    };
    await addNote(note.title, note.description, note.tags);
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    
  };
  const { dark } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        variant=" my-3 outline"
        onClick={handleShow}
        className={`text-${dark ? "dark" : "light"} bg-${
          dark ? "light" : "dark"
        }`}
      >
        <strong>Add Note</strong>
        <i className="fa fa-plus-circle mx-3 fa-lg" aria-hidden="true"></i>
      </Button>
      <Form onSubmit={handelAddNote}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header
            closeButton
            className={`text-${dark ? "light" : "dark"} bg-${
              dark ? "dark" : "light"
            }`}
          >
            <Modal.Title>Add Note</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`text-${dark ? "light" : "dark"} bg-${
              dark ? "dark" : "light"
            }`}
          >
            <Container>
              <Form.Group className={`mb-3 text-${dark ? "light" : "dark"}`}>
                <Form.Label
                  className={`mb-3 text-${dark ? "light" : "dark"}`}
                  htmlFor="title"
                >
                  Add Title
                </Form.Label>
                <Form.Control
                  required
                  minLength={3}
                  size="lg"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Add title..."
                  onChange={onchange}
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>
              <Form.Group className="mb-3">
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
                  required
                  minLength={5}
                  rows={3}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Add Description..."
                  onChange={onchange}
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                  htmlFor="tags"
                >
                  Add Tags
                </Form.Label>
                <Form.Control
                  required
                  minLength={3}
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Add tags..."
                  onChange={onchange}
                  className={`mb-3 bg-${dark ? "dark" : "light"} text-${
                    dark ? "light" : "dark"
                  }`}
                />
              </Form.Group>
            </Container>
          </Modal.Body>
          <Modal.Footer
            className={` text-${dark ? "light" : "dark"} bg-${
              dark ? "dark" : "light"
            }`}
          >
            <Button
              variant="secondary"
              onClick={handleClose}
              className={` text-${dark ? "light" : "dark"} bg-${
                dark ? "dark" : "light"
              }`}
            >
              Close
            </Button>
            <Button
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              variant="primary"
              onClick={handelAddNote}
              className={`text-${dark ? "dark" : "light"} bg-${
                dark ? "light" : "dark"
              }`}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}

export default AddNote
