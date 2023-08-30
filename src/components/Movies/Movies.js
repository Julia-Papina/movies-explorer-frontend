
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import * as moviesApi from "../../utils/MoviesApi";

function Movies() {
  const [moviesArray, setMoviesArray] = useState([]);

  useEffect(() => {
    moviesApi
      .getAllMovies()
      .then((data) => {
        setMoviesArray(data);
      })
      .catch((err) => {
        alert(`Возникла ошибка ${err}`);
      });
  }, []);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesArray={moviesArray} />
      <Footer />
    </section>
  );
}

export default Movies;