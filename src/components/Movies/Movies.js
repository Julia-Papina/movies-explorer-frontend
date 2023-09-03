import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
//import * as moviesApi from "../../utils/MoviesApi";

function Movies({ isLoading, moviesArray }) {
  //const [moviesArray, setMoviesArray] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [displayListMovies, setDisplayListMovies] = useState(12);

  const moviesList = filteredMovies.slice(0, displayListMovies);

  // локальное хранилище всех фильмов
  const localStorageMovies = JSON.parse(localStorage.getItem("moviesArray"));

  // локальное хранище коротких фильмов
  const localStorageShortMovies = JSON.parse(
    localStorage.getItem("shortMovies")
  );

  // локальное хранилище запроса
  const localStorageSearchQuery = localStorage.getItem("query");

  const slicedLocalStorageQuery = localStorageSearchQuery
    ? localStorageSearchQuery.slice(1, -1)
    : "";

  const localStoragedIsChecked = localStorage.getItem("isChecked");

  function handleLocalStorageData() {
    if (localStorageMovies === null) {
      return;
    }

    const restoredShortMovies =
      localStorageShortMovies && localStoragedIsChecked;

    if (restoredShortMovies) {
      setFilteredMovies(localStorageShortMovies);
      setIsChecked(true);
    } else {
      setFilteredMovies(localStorageMovies);
    }

    setSearchQuery(localStorageSearchQuery);
  }

  // возвращаем предыдущий запрос если он был

  useEffect(() => {
    handleLocalStorageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //загрузка всех фильмов
  // useEffect(() => {
  //  moviesApi
  //    .getAllMovies()
  //   .then((data) => {
  //     setLoading(false);
  //     setMoviesArray(data);
  //   })
  //   .catch((err) => {
  //     setLoading(false);
  //     alert(`Возникла ошибка ${err}`);
  //   });
  // }, []);

  function updateDisplayCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      setDisplayListMovies(12);
    } else if (screenWidth >= 900) {
      setDisplayListMovies(9);
    } else if (screenWidth >= 768) {
      setDisplayListMovies(8);
    } else {
      setDisplayListMovies(6);
    }
  }

  //изменение кол-ва карточек в зависимости от ширины экрана
  useEffect(() => {
    updateDisplayCards();
    window.addEventListener("resize", () => {
      updateDisplayCards();
    });
    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, []);

  // запрос формы
  function handleSearchSubmit() {
    if (searchQuery === "") {
      setValidationMessage("Нужно ввести ключевое слово");
      return;
    }

    // поиск фильмов на основе запроса
    setValidationMessage("");
    const filtered = moviesArray.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchQuery.toLowerCase().slice(1, -1));
    });
    setFilteredMovies(filtered);
    // обновление localStorage при изменении filteredMovies
    localStorage.setItem("moviesArray", JSON.stringify(filtered));
  }

  // переключатель короткометражек
  function handleCheckboxChange() {
    if (isChecked === false) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration < 60);
      setIsChecked(true);
      setFilteredMovies(shortMovies);
      localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
      localStorage.setItem("isChecked", JSON.stringify(true));
    } else {
      handleSearchSubmit();
      setIsChecked(false);
      localStorage.removeItem("shortMovies");
      localStorage.removeItem("isChecked");
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
      window.innerWidth > 768 ? displayListMovies + 3 : displayListMovies + 2
    );
  };

  return (
    <section className="movies">
      <SearchForm
        onSearchClick={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setFilteredMovies={setFilteredMovies}
        checkboxChange={handleCheckboxChange}
        validationMessage={validationMessage}
        defaultValue={slicedLocalStorageQuery}
        isChecked={isChecked}
      />
      <MoviesCardList
        list={filteredMovies}
        isLoading={isLoading}
        handleClickButtonMore={handleClickButtonMore}
        moviesList={moviesList}
      />
      <Footer />
    </section>
  );
}

export default Movies;
