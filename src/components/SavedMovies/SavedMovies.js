import { useState, useContext, useEffect } from "react"; //, useEffect , useContext
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { MoviesUserContext } from "../../context/MoviesUserContext";
import Footer from "../Footer/Footer";

function SavedMovies({ getSavedMovies }) {
  const { userMoviesSaved, setUserMoviesSaved } = useContext(MoviesUserContext);
  const [query, setQuery] = useState("");
  const [filteredUserMovies, setFilteredUserMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredUserMovies(userMoviesSaved);
  }, [userMoviesSaved]);

  function handleSearchMoviesSaved() {
    const filtered = userMoviesSaved.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return movieName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUserMovies(filtered);
  }

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  };

  const localStorageMovies = JSON.parse(localStorage.getItem("userMovies"));

  function handleCheckboxChange() {
    if (isChecked === false) {
      const shortMovies = userMoviesSaved.filter(
        (movie) => movie.duration < 60
      );
      setIsChecked(true);
      setUserMoviesSaved(shortMovies);
      localStorage.setItem("userMovies", JSON.stringify(userMoviesSaved));
    } else {
      setIsChecked(false);
      setUserMoviesSaved(localStorageMovies);
      localStorage.removeItem("userMovies");
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onSearchClick={handleSearchMoviesSaved}
        handleSearchChange={handleOnChange}
        searchQuery={query}
        onToggleLike={handleCheckboxChange}
      />
      <MoviesCardList
        list={userMoviesSaved}
        moviesList={filteredUserMovies}
        userMoviesSaved={userMoviesSaved}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
