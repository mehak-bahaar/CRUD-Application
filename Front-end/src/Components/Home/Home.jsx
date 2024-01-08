import React from 'react'
import { useContext } from 'react'
import NoteContext from '../../Context/notes/notesConstext'
import { Form, Button, Row, Container } from 'react-bootstrap'
import Notes from '../Notes/Notes'

const Home = (props) => {
    const context = useContext(NoteContext)
  return (
    <div>
        
      
      <Row>
        <Notes dark={props.dark} showalert={props.showalert} />
      </Row>
      <h5>
        Designed by: <strong>Mehak Bahar</strong>
      </h5>
    </div>
  );
}

export default Home
