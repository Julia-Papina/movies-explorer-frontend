import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function MoviesCardList({ list, isLoading, handleClickButtonMore, moviesList, isRequestError }) {
  const location = useLocation();
  const pageMovies = location.pathname === '/movies';
  const requestError = `Во время запроса произошла ошибка. Возможно, 
  проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`;
  const notFoundError = 'Ничего не найдено';
  const messageError = isRequestError ? requestError : notFoundError;
  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="movies-card-list">
        <div className="movies-card-list__container">
          <div className="movies-card-list__elements">
            {moviesList.length > 0 ? (
              moviesList.map((movie) => {
                return <MoviesCard key={movie.id || movie._id} movie={movie} list={list}/>;
              })
            ) : (
              <p className="movies-card-list__message">{messageError}</p>
            )}
          </div>

          <div className="movies-card-list__load">
            {pageMovies && list.length > moviesList.length && (
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