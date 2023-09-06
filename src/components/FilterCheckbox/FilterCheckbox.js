// import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ text, onToggleLike, isChecked }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        onClick={onToggleLike}
      />
      <span className="filter-checkbox__span"></span>
      <span className="filter-checkbox__text">{text}</span>
    </label>
  );
}

export default FilterCheckbox;
