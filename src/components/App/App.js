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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import success from "../../images/success.svg";
import reject from "../../images/reject.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupTooltipImage, setPopupTooltipImage] = useState("");
  const [popupTooltipTitle, setPopupTooltipTitle] = useState("");
  const handleError = (err) => console.error(`Возникла ошибка ${err}`);
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
        .catch(handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRegister(values) {
    auth
      .register(values.email, values.password, values.name)
      .then(() => {
        setPopupTooltipImage(success);
        setPopupTooltipTitle("Вы успешно зарегистрировались!");
        onLogin(values);
      })
      .catch((err) => {
        if (err === "409 Conflict") {
          setPopupTooltipImage(reject);
          setPopupTooltipTitle("Такой пользователь уже сущетсвует.");
        } else {
          setPopupTooltipImage(reject);
          setPopupTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
          handleError(err);
        }
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(values) {
    auth
      .login(values.email, values.password)
      .then((res) => {
        localStorage.setItem("userId", res._id);
        setIsLoggedIn(true);
        setPopupTooltipImage(success);
        setPopupTooltipTitle("Успешно!");
        navigate("/movies", { replace: true });
        
      })
      .catch((err) => {
        if (err === "401 Unauthorized") {
          setPopupTooltipImage(reject);
          setPopupTooltipTitle(
            "Ошибка авторизации! Неправильная почта или пароль."
          );
        } else {
          setPopupTooltipImage(reject);
          setPopupTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
          handleError(err);
        }
      })
      .finally(handleInfoTooltip);
  }

  useEffect(() => {
    isLoggedIn &&
      Promise.all([
        api.getProfile(),
        moviesApi.getAllMovies(),
      ])
        .then(([profileUserInfo, data]) => {
          setCurrentUser(profileUserInfo);
          setLoading(false);
          setMoviesArray(data);
        })
        .catch(() => {
          setLoading(false);
          setRequestError(true);
          setPopupTooltipImage(reject);
          setPopupTooltipTitle("Произошла ошибка, поробуйте еще раз.");
          handleInfoTooltip();
        });
  }, [isLoggedIn]);

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((data) => {
        setUserMoviesSaved(data);
      })
      .catch((err) => {
        setPopupTooltipImage(reject);
        setPopupTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
        handleInfoTooltip();
        handleError(err);
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
        setTimeout(() => {
          setIsOkRequest(true);
        }, 2000);
      })
      .catch((err) => {
        console.error(`${err}`);
        setServerError(err);
        setIsOkRequest(false);
      });
  }
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setInfoTooltip(false);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

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
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/signin"
                  element={<Login onLogin={onLogin} isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={Movies}
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                      moviesArray={moviesArray}
                      isRequestError={isRequestError}
                      getSavedMovies={getSavedMovies}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={SavedMovies}
                      isLoggedIn={isLoggedIn}
                      getSavedMovies={getSavedMovies}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={Profile}
                      isLoggedIn={isLoggedIn}
                      onSignOut={onSignOut}
                      onUpdateProfile={onUpdateUser}
                      isOkRequest={isOkRequest}
                    />
                  }
                />
                <Route
                  path="*"
                  element={<PageNotFound isLoggedIn={isLoggedIn} />}
                />
              </Routes>
              <InfoTooltip
                image={popupTooltipImage}
                title={popupTooltipTitle}
                isOpen={infoTooltip}
                onCloseClick={handlePopupCloseClick}
                onClose={closeAllPopups}
              />
            </main>
          </div>
        </CurrentUserContext.Provider>
      </MoviesUserContext.Provider>
    </div>
  );
}

export default App;
