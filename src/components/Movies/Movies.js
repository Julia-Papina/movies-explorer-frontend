import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";

function Movies() {
  return (
    <section className="movies">
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default Movies;
