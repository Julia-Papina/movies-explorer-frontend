import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';

function SavedMovies() {
    return (
        <section className="saved-movies">
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList />
    </section>
       
    )

}

export default SavedMovies;