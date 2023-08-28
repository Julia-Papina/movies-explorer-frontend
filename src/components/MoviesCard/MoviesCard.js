// import React, { useState } from "react";
import "./MoviesCard.css";
import { timeConverter } from "../../utils/timeConverter";
import { BASE_IMG_LINK } from "../../utils/constants";
import { Link } from "react-router-dom";

function MoviesCard({ pathname, movie }) {

  const buttontElement =
  pathname === "/saved-movies" ? (
    <button type="button" className="movies-card__button">
      &#215;
    </button>
  ) :
 pathname === "/movies" ? (
      <button
        type="submit"
        className="movies-card__button movies-card__button_typ_save"
      >
        &#10003;
      </button>
    ) : (
      <button type="submit" className="movies-card__button" >
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
