import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <fieldset className="search-form__field">
            <input
              type="text"
              placeholder="Фильм"
              className="search-form__input"
              required
            />
            <button className="search-form__button">Поиск</button>
          </fieldset>
          <FilterCheckbox text={"Короткометражки"} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;