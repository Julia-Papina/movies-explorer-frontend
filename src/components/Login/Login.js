import "./Login.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useValidationForm } from "../../hooks/useValidationForm";
import { validateEmail } from "../../utils/validator";

function Login(props) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    props.onLogin(values);
  }

  React.useEffect(() => {
    if (props.isLoggedIn) {
      navigate("/movies");
    }
  }, [props.isLoggedIn, navigate]);

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__wrapper">
          <Link to={"/"}>
            <img src={logo} alt="Логотип" className="login__logo-image" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <label className="login__form-label" htmlFor="email">
            E-mail
            <input
              className="login__form-input"
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
              className={`login__form-error ${
                isValid ? "" : "login__form-error login__form-error_active"
              }`}
            >
              {validateEmail(values.email).error}
            </span>
          </label>

          <label className="login__form-label" htmlFor="password">
            Пароль
            <input
              className="login__form-input"
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
              className={`login__form-error ${
                isValid ? "" : "login__form-error login__form-error_active"
              }`}
            >
              {errors.password}
            </span>
          </label>
        </div>
        <div className="login__wrapper">
          <button
            type="submit"
            className={`login__button ${
              isValid && validateEmail(values.email).activeButton
                ? ""
                : "login__button_disabled"
            }`}
            disabled={!isValid}
          >
            Войти
          </button>
          <p className="login__question">
            Ещё не зарегистрированы?{" "}
            <Link to={"/signup"} className="login__link">
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
