import React from 'react'
import NoteContext from "../../Context/notes/notesConstext";
import { useContext } from 'react';
const About = () => {
const context = useContext(NoteContext);

  return (
    <div>
      <h1>this is About</h1>
      <h5>
        Designed by: <strong>{context.name}</strong>
      </h5>
    </div>
  );
}

export default About
