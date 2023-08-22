import "./MoviesCard.css";
import { timeConverter } from "../../utils/timeConverter";
import saveCard from "../../images/saveCard.svg";

function MoviesCard({ pathname, movie }) {
  const buttontElement =
    pathname === "/saved-movies" ? (
      <button type="button" className="movies-card__button">
        &#215;
      </button>
    ) : movie.isSave ? (
      <img
        src={saveCard}
        alt="Сохранено"
        className="movies-card__button movies-card__button_typ_save"
      />
    ) : (
      <button type="button" className="movies-card__button">
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
      <img
        className="movies-card__img"
        src={movie.thumbnail}
        alt={movie.nameRU}
      />
      {buttontElement}
    </article>
  );
}

export default MoviesCard;
