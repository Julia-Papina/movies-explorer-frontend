import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ list, isLoading, handleClickButtonMore, moviesList }) {

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="movies-card-list">
        <div className="movies-card-list__container">
          <div className="movies-card-list__elements">
            {moviesList.length > 0 ? (
              moviesList.map((movie) => {
                return <MoviesCard key={movie.id} movie={movie} />;
              })
            ) : (
              <p className="movies-card-list__message">Ничего не найдено</p>
            )}
          </div>

          <div className="movies-card-list__load">
            {list.length > moviesList.length && (
              <button
                type="button"
                onClick={handleClickButtonMore}
                className="loading-button"
              >
                Еще
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;
