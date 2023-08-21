import "./MoviesCardList.css";
import { moviesArray } from "../../utils/moviesArray";
import MoviesCard from "../MoviesCard/MoviesCard";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useLocation } from "react-router-dom";
import { moviesSave } from "../../utils/moviesSave";
import Preloader from "../Preloader/Preloader";

function MoviesCardList() {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <div className="movies-card-list__elements">
          {pathname === "/movies"
            ? moviesArray.map((item) => {
                return (
                  <MoviesCard
                    movie={item}
                    key={item.movieId}
                    pathname={pathname}
                  />
                );
              })
            : null}
        </div>

        <div className="movies-card-list__elements">
          {pathname === "/saved-movies"
            ? moviesSave.map((item) => {
                return (
                  <MoviesCard
                    movie={item}
                    key={item.movieId}
                    pathname={pathname}
                  />
                );
              })
            : null}
        </div>

        <div className="movies-card-list__load">
          {false ? <Preloader /> : <LoadingButton />}
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
