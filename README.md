---

# MERN CRUD Notebook App

This is a simple MERN (MongoDB, Express.js, React, Node.js) stack project that implements a CRUD (Create, Read, Update, Delete) functionality for a notebook application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)

## Introduction

This project is a notebook application that allows users to create, read, update, and delete notes. Users can sign up, log in, and manage their personal notes. The application is built using the MERN stack, which includes MongoDB for the database, Express.js for the backend, React for the frontend, and Node.js for server-side scripting.

## Features

- **User Authentication:**
  - Users can sign up, log in, and authenticate using JWT (JSON Web Tokens).

- **Note Management:**
  - Create new notes with a title, description, and optional tags.
  - View a list of all notes associated with the logged-in user.
  - Update existing notes, including modifying title, description, and tags.
  - Delete notes.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose for database management

- **Frontend:**
  - React.js
  - React Bootstrap
  - Context API for state management
  - 
- **Validation:**
  - Express Validator
  - 
- **Password Management:**
  - Express Validator

- **Authentication:**
  - JWT (JSON Web Tokens)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-crud-notebook.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mern-crud-notebook
   ```

3. Install dependencies:
   ```bash
   # Install server-side dependencies
   cd server
   npm install

   # Install client-side dependencies
   cd ../client
   npm install
   ```

4. Configure MongoDB:
   - Create a MongoDB database and update the connection string in `server/db.js` and `.env` files.

5. Run the project:
   ```bash
   # Start the server
   cd ../server
   npm start

   # Start the client (in a new terminal window)
   cd ../client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Project Structure

- **Server:**
  - `server/index.js`: Main entry point for the Express server.
  - `server/routes/auth.js`: Authentication routes (signup, login).
  - `server/routes/notes.js`: CRUD routes for managing notes.
  - `server/middleware/FetchUserDets.js`: Middleware for fetching user details from the JWT token.
  - `server/modules/User.js`: Mongoose model for the user schema.
  - `server/modules/Notes.js`: Mongoose model for the notes schema.

- **Client:**
  - `client/src/components`: React components for different sections of the application.
  - `client/src/context/notesContext.js`: Context API for state management.
  - `client/src/pages`: React components for different pages/views.
  - `client/src/services/noteService.js`: Service for handling API calls related to notes.

## API Endpoints

- **Authentication:**
  - `POST /api/auth/signup`: Sign up a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `POST /api/auth/userdetails`: Fetch user details (protected route).

- **Notes:**
  - `GET /api/notes/allNotes`: Fetch all notes for the logged-in user.
  - `POST /api/notes/addNote`: Add a new note for the logged-in user.
  - `PUT /api/notes/updateNote/:id`: Update an existing note by ID.
  - `DELETE /api/notes/deleteNote/:id`: Delete a note by ID.

## Frontend Structure

- **Components:**
  - `Navbar`: Navigation header.
  - `SignupForm`, `LoginForm`, `UserDetails`: Authentication-related components.
  - `Notes`, `NoteItems`, `AddNote`, `UpdateNote`: Components for displaying and managing notes.
  - `Alerts`, `About`: Other components.

- **Context:**
  - `notesContext.js`: Context API for managing global state related to notes.


---
