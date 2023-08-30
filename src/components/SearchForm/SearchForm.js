import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchQuery,
  handleSearchChange,
  onSearchClick,
  isChecked,
  validationMessage,
  defaultValue,
  checkboxChange,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchClick();
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <fieldset className="search-form__field">
            <input
              type="search"
              id="search-input"
              placeholder="Фильм"
              className="search-form__input"
              required
              defaultValue={defaultValue}
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <button className="search-form__button" type="submit">
              Поиск
            </button>
          </fieldset>
          {validationMessage && (
            <span className="searchform__validation">{validationMessage}</span>
          )}
          <FilterCheckbox
            text={"Короткометражки"}
            isChecked={isChecked} 
            checkboxChange={checkboxChange}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
