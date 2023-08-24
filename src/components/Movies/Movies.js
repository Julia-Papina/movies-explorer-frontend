import React, { useEffect } from "react";
import { useState } from "react";
import * as moviesApi from "../../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => setMoviesList(data))
      .catch((err) => alert(`Возникла ошибка ${err}`));
  }, []);
  return (
    <section className="movies">
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
      <Footer />
    </section>
  );
}

export default Movies;
