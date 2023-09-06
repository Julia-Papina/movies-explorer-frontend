import React, { useState, useContext, useEffect } from "react";
import "./MoviesCard.css";
import { timeConverter } from "../../utils/timeConverter";
import { BASE_IMG_LINK } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import api from "../../utils/MainApi";
import { MoviesUserContext } from "../../context/MoviesUserContext";

function MoviesCard({ movie }) {
  const [isLiked, setIsLike] = useState(false);
  const { userMoviesSaved, setUserMoviesSaved } = useContext(MoviesUserContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLike(
      userMoviesSaved.some((userMovie) => userMovie.nameRU === movie.nameRU)
    );
  }, [userMoviesSaved, movie.nameRU]);

  // Сохранить фильм
  function handleSaveMovie() {
    api
      .saveMovie(movie)
      .then(() => {
        setIsLike(true);
        setUserMoviesSaved([...userMoviesSaved, movie]);
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  function toggleButtonSave() {
    const isMovieSaved = userMoviesSaved.some(
      (userMovie) => userMovie.nameRU === movie.nameRU
    );
    if (!isMovieSaved) {
      handleSaveMovie();
    } else {
      // использую id сохраненного фильма для удаления
      const savedMovie = userMoviesSaved.find(
        (userMovie) => userMovie.nameRU === movie.nameRU
      );
      if (savedMovie) {
        api
          .deleteMovie(savedMovie._id)
          .then(() => {
            setUserMoviesSaved(
              userMoviesSaved.filter((userMovie) => userMovie._id !== savedMovie._id)
            );
            setIsLike(false);
          })
          .catch((err) => console.log(`Возникла ошибка ${err}`));
      }
    }
  }

  // удалить фильм
  function handleRemoveMovie() {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setIsLike(false);
        setUserMoviesSaved(
          userMoviesSaved.filter((userMovie) => userMovie._id !== movie._id)
        );
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  const buttontElement = isLiked ? (
    <button
      type="submit"
      className="movies-card__button movies-card__button_typ_save"
      onClick={toggleButtonSave}
    >
      &#10003;
    </button>
  ) : (
    <button
      type="submit"
      className="movies-card__button"
      onClick={toggleButtonSave}
    >
      Сохранить
    </button>
  );
  return (
    <article className="movies-card">
      <div className="movies-card__about">
        <h2 className="movies-card__header">{movie.nameRU}</h2>
        <span className="movies-card__duration">
          {timeConverter(movie.duration)}
        </span>
      </div>
      <div className="movies-card__wrapper">
        <Link
          className="movies-card__link"
          to={movie.trailerLink}
          target="_blank"
        >
          <img
            className="movies-card__img"
            src={
              movie.image.url ? BASE_IMG_LINK + movie.image.url : movie.image
            }
            alt={movie.nameRU}
          />
        </Link>
      </div>
      {pathname === "/movies" ? buttontElement : null}
      {pathname === "/saved-movies" ? (
        <button
          type="button"
          className="movies-card__button"
          onClick={handleRemoveMovie}
        >
          &#215;
        </button>
      ) : null}
    </article>
  );
}

export default MoviesCard;
