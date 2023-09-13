import React, { useContext } from "react"; //useState, , useEffect
import "./MoviesCard.css";
import { timeConverter } from "../../utils/timeConverter";
import { BASE_IMG_LINK } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import api from "../../utils/MainApi";
import { MoviesUserContext } from "../../context/MoviesUserContext";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const { userMoviesSaved, setUserMoviesSaved } = useContext(MoviesUserContext);

  const saveMovie = userMoviesSaved
    ? userMoviesSaved.find((item) => item.movieId === movie.id)
    : "";

  const isLiked = userMoviesSaved
    ? userMoviesSaved.some((i) => i.movieId === movie.id)
    : false;

  const toggleButtonSave = (movie, isLiked, id) => {
    if (isLiked) {
      handleRemoveMovie(id);
    } else {
      api
        .saveMovie(movie)
        .then((newSaveMovie) => {
          setUserMoviesSaved([...userMoviesSaved, newSaveMovie]);
        })
        .catch((err) => console.log(`Возникла ошибка ${err}`));
    }
  };
  // удалить фильм
  function handleRemoveMovie(id) {
    api
      .deleteMovie(id)
      .then(() => {
        setUserMoviesSaved(userMoviesSaved.filter((m) => m._id !== id));
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  const handleLikeClick = () => {
    toggleButtonSave(movie, isLiked, saveMovie?._id);
  };
  const handleDeleteClick = () => {
    handleRemoveMovie(movie._id);
  };
  const buttontElement = isLiked ? (
    <button
      type="submit"
      className="movies-card__button movies-card__button_typ_save"
      onClick={handleLikeClick}
    >
      &#10003;
    </button>
  ) : (
    <button
      type="submit"
      className="movies-card__button"
      onClick={handleLikeClick}
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
      {pathname === "/movies" && buttontElement}
      {pathname === "/saved-movies" && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="movies-card__button"
          alt="Крестик"
        >
          ✗
        </button>
      )}
    </article>
  );
}

export default MoviesCard;
