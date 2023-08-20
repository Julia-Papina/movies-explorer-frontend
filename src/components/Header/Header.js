import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";


function Header({ isAuth, props }) {
  const { pathname } = useLocation();
  const headerStyle = pathname === "/" ? "header header_type_blue" : "header";

  return (
    <header className={headerStyle}>
      <div className="header__container">
        <Link to={"/"} className="header__link">
          <img className="header__logo" src={logo} alt="Логотип" />
        </Link>

        { !isAuth ? (
          <div className="header__wrapper">
            <Link className="header__btn" to={"/signup"}>
              Регистрация
            </Link>
            <Link
              className="header__btn header__btn_active"
              to={"/signin"}
            >
              Войти
            </Link>
          </div>
        ) : (
          <Navigation  />
        )}
      </div>
    </header>
  );
}

export default Header;
