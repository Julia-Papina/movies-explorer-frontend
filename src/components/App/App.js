import React from "react";
import "./App.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import * as auth from "../../utils/auth";
import api from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("userId");
    if (jwt) {
      auth
        .tokenUser(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRegister(email, password, name) {
    auth
      .register(email, password, name)
      .then(() => {
        onLogin(email, password)
      })
      .catch((err) => {
        alert(`Возникла ошибка ${err}`);
      });
  }

  function onLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("userId", res._id);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        alert(`Возникла ошибка ${err}`);
      });
  }


  useEffect(() => {
    if (isLoggedIn) {
      api
        .getProfile()
        .then((profileUserInfo) => setCurrentUser(profileUserInfo))
        .catch((err) => alert(`Возникла ошибка ${err}`));
    }
  }, [isLoggedIn]);

  function onSignOut() {
    setIsLoggedIn(false);
    navigate("/");
    localStorage.removeItem("userId");
  }

  const movies = isLoggedIn ? <Movies /> : <Main />;
  const savedMovies = isLoggedIn ? <SavedMovies /> : <Main />;
  const profile = isLoggedIn ? <Profile onSignOut={onSignOut} /> : null;
 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          {pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile" ? (
            <Header isLoggedIn={isLoggedIn} />
          ) : null}
          <main className="content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<Register onRegister={onRegister} />} />
              <Route path="/signin" element={<Login onLogin={onLogin} />} />
              <Route path="/movies" element={movies} />
              <Route path="/saved-movies" element={savedMovies} />
              <Route path="/profile" element={profile} />
              <Route path="*" element={<PageNotFound isLoggedIn={isLoggedIn} />} />
            </Routes>
          </main>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;