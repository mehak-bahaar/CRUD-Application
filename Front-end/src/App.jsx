import { useState } from 'react'
import './App.css'
import NavBar from "./Components/Navbar/Navbar"
import Home from "./Components/Home/Home"
import About from './Components/About/About'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import NoteState from './Context/notes/notesState'
import Alerts from './Components/Alert/Alerts'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

function App() {
  const [dark, setDark] = useState(false)
const [alert, setAlert] = useState(null);
const showAlert = (msg,type) => {
  setAlert({msg:msg, type: type})
  setTimeout(() =>{
    setAlert(null)
  },1500
  )
}
  return (
    <div
      className={` text-${dark ? "light" : "dark"}`}
      style={{ minHeight: "100vh", backgroundColor: dark ? "black" : "white" }}
    >
      <NoteState>
        <Router>
          <NavBar dark={dark} setDark={setDark} />
          <Alerts alert={alert} />
          <div className={`container text-${dark ? "light" : "dark"}`}>
            <Routes>
              <Route
                path="/"
                element={<Home showAlert={showAlert} dark={dark} />}
              ></Route>
              <Route
                path="/login"
                element={<Login showAlert={showAlert} dark={dark} />}
              ></Route>
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} dark={dark} />}
              ></Route>
              <Route
                exact
                path="/about"
                element={<About dark={dark} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App
