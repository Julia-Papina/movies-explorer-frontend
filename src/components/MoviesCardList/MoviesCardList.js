import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useLocation } from "react-router-dom";

function MoviesCardList({ moviesArray }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <div className="movies-card-list__elements">
          {moviesArray.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="movies-card-list__load">
          {pathname === "/movies" ? <LoadingButton /> : null}
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;