import React from "react";
import "./App.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { MoviesUserContext } from "../../context/MoviesUserContext";
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
  const [userMoviesSaved, setUserMoviesSaved] = useState([]);
  const [isRequestError, setRequestError] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("userId");
    if (jwt) {
      auth
        .tokenUser(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(pathname);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRegister(values) {
    auth
      .register(values.email, values.password, values.name)
      .then(() => {
        onLogin(values);
      })
      .catch((err) => {
        alert(`Возникла ошибка ${err}`);
      });
  }

  function onLogin(values) {
    auth
      .login(values.email, values.password)
      .then((res) => {
        localStorage.setItem("userId", res._id);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        alert(`Возникла ошибка ${err}`);
      });
  }

  useEffect(() => {
    isLoggedIn &&
      Promise.all([
        api.getProfile(),
        moviesApi.getAllMovies(),
      ])
        .then(([profileUserInfo, data, item]) => {
          setCurrentUser(profileUserInfo);
          setLoading(false);
          setMoviesArray(data);
        })
        .catch((err) => {
          setLoading(false);
          setRequestError(true);
        });
  }, [isLoggedIn]);

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((data) => {
        setUserMoviesSaved(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //выход
  function onSignOut() {
    setIsLoggedIn(false);
    navigate("/");
    localStorage.clear();
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
    <Movies
      isLoading={isLoading}
      moviesArray={moviesArray}
      isRequestError={isRequestError}
    />
  ) : (
    <Main />
  );
  const savedMovies = isLoggedIn ? (
    <SavedMovies getSavedMovies={getSavedMovies} />
  ) : (
    <Main />
  );
  const profile = isLoggedIn ? (
    <Profile
      onSignOut={onSignOut}
      onUpdateProfile={onUpdateUser}
      isOkRequest={isOkRequest}
    />
  ) : null;

  return (
    <div className="App">
      <MoviesUserContext.Provider
        value={{ userMoviesSaved, setUserMoviesSaved }}
      >
        <CurrentUserContext.Provider value={currentUser}>
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
                    <Register
                      onRegister={onRegister}
                      serverError={serverError}
                    />
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
        </CurrentUserContext.Provider>
      </MoviesUserContext.Provider>
    </div>
  );
}

export default App;
