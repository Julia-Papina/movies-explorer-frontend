// import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ text, checkboxChange, isChecked }) {
 // const [checkedFilter, setCheckedFilter] = useState(false);

 // const handleChangeFilter = () => {
   // setCheckedFilter(!checkedFilter);
 // };

  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        checked={isChecked}
        onChange={checkboxChange}
      />
      <span className="filter-checkbox__span" ></span>
      <span className="filter-checkbox__text" >
        {text}
      </span>
    </label>
  );
}

export default FilterCheckbox;
