
import './MoviesCard.css';
import { timeConverter } from '../../utils/timeConverter';

function MoviesCard({ movie }) {
  return (
    <article className="movies-card">
      <img
        className="movies-card__img"
        src={movie.thumbnail}
        alt={movie.nameRU}
      />
      <div className="movies-card__about">
        <h2 className="movies-card__header">{movie.nameRU}</h2>
        <button type="button" className="movies-card__icon" alt="Сохранено" />
      </div>
      <span className="movies-card__duration">
        {timeConverter(movie.duration)}
      </span>
    </article>
  );
}

export default MoviesCard;