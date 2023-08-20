import "./Navigation.css";
import iconMain from "../../images/icon__COLOR_icon-main.svg";
import hamburgerMenu from "../../images/hamburger-menu.svg";
import { Link, useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import { useState } from "react";

function Navigation(props) {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="navigation">
      <div className="navigation__wrapper">
        <div className="navigation__buttons-wrapper">
          <Link
            className={`navigation__btn ${
              isActive("/movies") ? "navigation__btn_active_desc" : ""
            }`}
            to={"/movies"}
          >
            Фильмы
          </Link>
          <Link
            className={`navigation__btn ${
              isActive("/saved-movies") ? "navigation__btn_active_desc" : ""
            }`}
            to={"/saved-movies"}
          >
            Сохранённые фильмы
          </Link>
        </div>

        <Link
          className={`navigation__btn navigation__btn_type_profile ${
            isActive("/profile") ? "navigation__btn_active_desc" : ""
          }`}
          to={"/profile"}
        >
          Аккаунт
          <img
            src={iconMain}
            alt="Переход на страницу профиля"
           className={ pathname === "/" ? 'navigation__icon navigation__icon_type_blue' : 'navigation__icon'}
          />
        </Link>
      </div>
      <div className="navigation__btn-tab">
        <button
          onClick={() => setShowPopup(true)}
          type="button"
          className="navigation__btn"
        >
          <img
            src={hamburgerMenu}
            alt="Открыть меню"
            className="navigation__icon navigation__icon_type_burger"
          />
        </button>
      </div>
      <Menu isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default Navigation;
