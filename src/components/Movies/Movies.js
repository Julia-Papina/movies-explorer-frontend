import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {
  SHORT_MOVIE_DURATION,
  WINDOW_WIDTH_MAX,
  WINDOW_WIDTH_MEDIUM,
  WINDOW_WIDTH_MIN,
  MIN_ADDED_MOVIES,
  MAX_ADDED_MOVIES,
  SHOWED_MOVIES_MAX,
  SHOWED_MOVIES_MEDIUM,
  SHOWED_MOVIES_MIN,
  SHOWED_MOVIES_MIN_OTHER,
} from "../../utils/constants";

function Movies({ isLoading, moviesArray, isRequestError, getSavedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [displayListMovies, setDisplayListMovies] = useState(SHOWED_MOVIES_MAX);
 // const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
 
 const moviesList = filteredMovies.slice(0, displayListMovies);
  const localStorageMovies = JSON.parse(localStorage.getItem("moviesArray")); // локальное хранилище всех фильмов
  const localStorageShortMovies = JSON.parse(
    localStorage.getItem("shortMovies")
  ); // локальное хранище коротких фильмов
  const localStorageSearchQuery = localStorage.getItem("query"); // локальное хранилище запроса
  const queryCorrected = localStorageSearchQuery
    ? localStorageSearchQuery.slice(1, -1)
    : "";
  const localStoragedIsChecked = localStorage.getItem("isChecked");

  useEffect(() => {
    getSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStoragedIsChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [localStoragedIsChecked]);

  useEffect(() => {
    handleLocalStorageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLocalStorageData() {
    if (localStorageMovies === null) {
      return;
    }

    localStorageShortMovies
      ? setFilteredMovies(localStorageShortMovies)
      : setFilteredMovies(localStorageMovies);

    setSearchQuery(queryCorrected);
  }

  function updateDisplayCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= WINDOW_WIDTH_MAX) {
      setDisplayListMovies(SHOWED_MOVIES_MAX);
    } else if (screenWidth >= WINDOW_WIDTH_MEDIUM) {
      setDisplayListMovies(SHOWED_MOVIES_MEDIUM);
    } else if (screenWidth >= WINDOW_WIDTH_MIN) {
      setDisplayListMovies(SHOWED_MOVIES_MIN);
    } else {
      setDisplayListMovies(SHOWED_MOVIES_MIN_OTHER);
    }
  }

  useEffect(() => {
    updateDisplayCards();
    window.addEventListener("resize", () => {
      updateDisplayCards();
    });
    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, []); //изменение кол-ва карточек в зависимости от ширины экрана

  // запрос формы
  function handleSearchSubmit() {
    const filtered = moviesArray.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return movieName
        .toLowerCase()
        .includes(searchQuery.toLowerCase().slice(1, -1));
    });
    setFilteredMovies(filtered);
    localStorage.setItem("moviesArray", JSON.stringify(filtered));
  }
  //фильтрация короткометражек
  function filterShortMovies() {
    return filteredMovies.filter(
      (movie) => movie.duration < SHORT_MOVIE_DURATION
    );
  }
  // переключатель короткометражек
  function handleCheckboxChange() {
    if (isChecked === false) {
      const shortMovies = filterShortMovies();
      setIsChecked(true);
      setFilteredMovies(shortMovies);
      localStorage.setItem("isChecked", true);
      localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
    } else {
      setIsChecked(false);
      setFilteredMovies(localStorageMovies);
      localStorage.removeItem("isChecked");
      localStorage.removeItem("shortMovies");
    }
  }
  // записала значение в поиске
  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    localStorage.setItem("query", JSON.stringify(value));
    setSearchQuery(localStorage.getItem("query", JSON.stringify(value)));
  };

  // добавление карточек из списка фильмов
  const handleClickButtonMore = () => {
    setDisplayListMovies(
      window.innerWidth > WINDOW_WIDTH_MIN
        ? displayListMovies + MAX_ADDED_MOVIES
        : displayListMovies + MIN_ADDED_MOVIES
    );
  };

  return (
    <section className="movies">
      <SearchForm
        onSearchClick={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setFilteredMovies={setFilteredMovies}
        onToggleLike={handleCheckboxChange}
        defaultValue={queryCorrected}
        isChecked={isChecked}
        searchQuery={searchQuery}
      />
      <MoviesCardList
        list={filteredMovies}
        isLoading={isLoading}
        handleClickButtonMore={handleClickButtonMore}
        moviesList={moviesList}
        setFilteredMovies={setFilteredMovies}
        isRequestError={isRequestError}
      />
      <Footer />
    </section>
  );
}

export default Movies;