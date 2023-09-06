import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchQuery,
  handleSearchChange,
  onSearchClick,
  onToggleLike,
  defaultValue,
  isChecked,
}) {
  const [validationMessage, setValidationMessage] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery.slice(1, -1) === "") {
      setValidationMessage("Нужно ввести ключевое слово");
      return;
    }
    setValidationMessage("");
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
              defaultValue={defaultValue}
              onChange={handleSearchChange}
              autoComplete="off"
              // value={searchQuery}
              // required
            />
            <button className="search-form__button" type="submit">
              Поиск
            </button>
          </fieldset>
          {validationMessage && (
            <span className="search-form__validation">
              Нужно ввести ключевое слово
            </span>
          )}
          <FilterCheckbox
            text={"Короткометражки"}
            onToggleLike={onToggleLike}
            isChecked={isChecked}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
