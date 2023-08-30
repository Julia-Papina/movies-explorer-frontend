import React, { useState } from "react";
import "./MoviesCard.css";
import { timeConverter } from "../../utils/timeConverter";
import { BASE_IMG_LINK } from "../../utils/constants";
import { Link } from "react-router-dom";
import api from "../../utils/MainApi";

function MoviesCard({ pathname, movie }) {
  const [isLiked, setLike] = useState(false);

  function handleSaveMovie() {
    api
      .saveMovie(movie)
      .then((savedMovie) => {
        setLike(true);
        movie._id = savedMovie._id;
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  function handleRemoveMovie() {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setLike(false);
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  const buttontElement = isLiked ? (
    // pathname === "/saved-movies" ? (
    //  <button type="button" className="movies-card__button">
    //   &#215;
    //  </button>
    // ) :
    // pathname === "/movies" ? (
    <button
      type="submit"
      className="movies-card__button movies-card__button_typ_save"
      onClick={handleRemoveMovie}
    >
      &#10003;
    </button>
  ) : (
    <button
      type="submit"
      className="movies-card__button"
      onClick={handleSaveMovie}
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
      {buttontElement}
    </article>
  );
}

export default MoviesCard;
