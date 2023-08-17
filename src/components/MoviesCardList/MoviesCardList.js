import './MoviesCardList.css';
import { moviesArray } from '../../utils/moviesArray';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className="movies-card-list">
             <div className="movies-card-list__container">
          <div className="movies-card-list__elements">
            {moviesArray.map((item) => {
              return <MoviesCard movie={item} key={item.movieId} />;
            })}
          </div>
          </div>
        </section>
      );

}

export default MoviesCardList;