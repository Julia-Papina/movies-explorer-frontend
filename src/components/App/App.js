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
import * as moviesApi from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [moviesArray, setMoviesArray] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverError, setServerError] = useState({});
  const [isOkRequest, setIsOkRequest] = useState(false);

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
        onLogin(email, password);
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

  // useEffect(() => {
  //  if (isLoggedIn) {
  //    api
  //      .getProfile()
  //      .then((profileUserInfo) => setCurrentUser(profileUserInfo))
  //      .catch((err) => alert(`Возникла ошибка ${err}`));
  //  }
  // }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getProfile(), moviesApi.getAllMovies()])
        .then(([profileUserInfo, data]) => {
          setCurrentUser(profileUserInfo);
          setLoading(false);
          setMoviesArray(data);
        })
        .catch((err) => {
          setLoading(false);
          console.error(`Ошибка: ${err}`);
        });
  }, [isLoggedIn]);

  function onSignOut() {
    setIsLoggedIn(false);
    navigate("/");
    localStorage.removeItem("userId");
    localStorage.removeItem("moviesArray");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("query");
    localStorage.removeItem("isChecked");
  }

  // Обновление данных пользователя
  function onUpdateUser(data) {
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        setIsOkRequest(true);
      })
      .catch((err) => {
        console.error(`${err}`);
        setServerError(err);
        setIsOkRequest(false);
      });
  }

  const movies = isLoggedIn ? (
    <Movies isLoading={isLoading} moviesArray={moviesArray} />
  ) : (
    <Main />
  );
  const savedMovies = isLoggedIn ? <SavedMovies /> : <Main />;
  const profile = isLoggedIn ? (
    <Profile
      onSignOut={onSignOut}
      onUpdateProfile={onUpdateUser}
      isOkRequest={isOkRequest}
    />
  ) : null;

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
              <Route
                path="/signup"
                element={
                  <Register onRegister={onRegister} serverError={serverError} />
                }
              />
              <Route path="/signin" element={<Login onLogin={onLogin} />} />
              <Route path="/movies" element={movies} />
              <Route path="/saved-movies" element={savedMovies} />
              <Route path="/profile" element={profile} />
              <Route
                path="*"
                element={<PageNotFound isLoggedIn={isLoggedIn} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
