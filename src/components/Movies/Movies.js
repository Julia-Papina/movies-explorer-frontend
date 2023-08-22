import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <section className="movies">
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export default Movies;
