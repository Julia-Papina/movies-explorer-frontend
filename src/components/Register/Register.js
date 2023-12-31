import "./Register.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../images/logo.svg";
import { useValidationForm } from "../../hooks/useValidationForm";
import { validateName, validateEmail } from "../../utils/validator";

function Register(props) {
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values);
  }

  React.useEffect(() => {
    if (props.isLoggedIn) {
      navigate('/movies');

    }
  }, [props.isLoggedIn, navigate])

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <Link to={"/"}>
            <img src={logo} alt="Логотип" className="register__logo-image" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <label className="register__form-label" htmlFor="name">
            Имя
            <input
              className="register__form-input"
              id="name"
              type="name"
              name="name"
              autoComplete="off"
              minLength="2"
              maxLength="30"
              required
              placeholder="Виталий"
              value={values.name || ""}
              onChange={handleChange}
            />
            <span
              className={`register__form-error ${
                isValid
                  ? ""
                  : "register__form-error register__form-error_active"
              }`}
            >
              {validateName(values.name).error}
            </span>
          </label>

          <label className="register__form-label" htmlFor="email">
            E-mail
            <input
              className="register__form-input"
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              minLength="2"
              maxLength="30"
              required
              placeholder="pochta@yandex.ru"
              value={values.email || ""}
              onChange={handleChange}
            />
            <span
              className={`register__form-error ${
                isValid
                  ? ""
                  : "register__form-error register__form-error_active"
              }`}
            >
              {validateEmail(values.email).error}
            </span>
          </label>

          <label className="register__form-label" htmlFor="password">
            Пароль
            <input
              className="register__form-input"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              minLength="5"
              maxLength="30"
              required
              placeholder="••••••••"
              value={values.password || ""}
              onChange={handleChange}
            />
            <span
              className={`register__form-error ${
                isValid
                  ? ""
                  : "register__form-error register__form-error_active"
              }`}
            >
              {errors.password}
            </span>
          </label>
        </div>
        <div className="register__wrapper">
          <button type="submit" className={`register__button ${
              isValid && 
              validateEmail(values.email).activeButton &&
              validateName(values.name).activeButton
                ? ''
                : 'register__button_disabled' 
            }`}
            disabled={!isValid ? true : ''}
            >
            Зарегистрироваться
          </button>
          <p className="register__question">
            Уже зарегистрированы?{" "}
            <Link to={"/signin"} className="register__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Register;
