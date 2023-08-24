import React from "react";
import "./App.css";


import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useState, } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const movies = <Movies />

 

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="page">
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={movies} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
