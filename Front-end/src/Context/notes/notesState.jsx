import React, { useState, useRef } from "react";
import NoteContext from "./notesConstext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([
  ]);
  const host = "http://localhost:3001";
  // function to fetch notes in other functions
  const fetchNotes = async (endpoint, method, headers, body) => {
    const response = await fetch(host + endpoint, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
      let json = await response.json();
      return json
  };
  // fetching all notes
  const getAllNotes = async () => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    };
    try {
      const response = await fetch(host + "/api/notes/allNotes", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        console.error("an error occured");
      }
      console.log(localStorage.getItem('token'))
      const json = await response.json();
      await setNotes(json);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const state = {
    name: "Mehak",
  };
  //function to add note
  const addNote = async (title, description, tag) => {
    const body = { title, description, tag };
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    };
    const json = await fetchNotes("/api/notes/addNote", "POST", headers, body);
    if(title === "" || description === ""){

    }
    let newNote = json;

    newNote.title = title;
    newNote.description = description;
    newNote.tags = tag;
    setNotes(notes.concat(newNote));
  };
  // function to delete note
  const deleteNote =async (_id) => {
    // deleting note from frontend ui
    const filterNotes = notes.filter((note) => note._id !== _id);
    setNotes(filterNotes);
    //deleting note from server
        const body = {};
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    };
    let response = await fetchNotes(`/api/notes/deleteNote/${_id}`, "DELETE", headers, body);


    
  };
 const updateNoteUi = async (_id, title, description, tag) => {


   const body = { title, description, tag };
   const headers = {
     "Content-Type": "application/json",
"auth-token": localStorage.getItem('token')
   }

   try {
     const response = await fetchNotes(`/api/notes/updateNote/${_id}`, 
        "PUT", 
       headers,
       body
     );
     let newNotes = JSON.parse(JSON.stringify(notes))
     
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === _id){
          newNotes[index].title=title
          newNotes[index].description=description
          newNotes[index].tag=tag
          break
        }
        
      }
      
      setNotes(newNotes)
     
   } catch (error) {
     console.error("Error updating note:", error);
   }
 };

  return (
    <NoteContext.Provider
      value={{ state, notes, setNotes, addNote, deleteNote, getAllNotes, updateNoteUi }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
