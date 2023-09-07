import React, { useContext, useState } from "react";  //, useEffect
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { MoviesUserContext } from "../../context/MoviesUserContext";
import Footer from "../Footer/Footer";

function SavedMovies() {
  const { userMoviesSaved, setUserMoviesSaved } = useContext(MoviesUserContext);
  const [query, setQuery] = useState("");
 
  function handleSearchMoviesSaved() {
    const filtered = userMoviesSaved.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(query.toLowerCase());
    });
    setUserMoviesSaved(filtered);
  }

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  };

  return (
    <section className="saved-movies">
      <SearchForm
        onSearchClick={handleSearchMoviesSaved}
        handleSearchChange={handleOnChange}
        searchQuery={query}
      />
      <MoviesCardList
        list={userMoviesSaved}
        moviesList={userMoviesSaved}
        userMovies={userMoviesSaved}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
