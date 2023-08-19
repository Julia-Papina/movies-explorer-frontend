
import './MoviesCard.css';
import { timeConverter } from '../../utils/timeConverter';
import saveCard from '../../images/saveCard.svg';

function MoviesCard({ movie }) {
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
      <button type="button" className="movies-card__button" alt="Сохранено">Сохранить</button> 
      
    </article>
  );
}

export default MoviesCard;