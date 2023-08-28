import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleInputName(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password, name);
  }

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
              value={name}
              onChange={handleInputName}
            />
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
              value={email}
              onChange={handleInputEmail}
            />
          </label>

          <label className="register__form-label" htmlFor="password">
            Пароль
            <input
              className="register__form-input"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              minLength="2"
              maxLength="30"
              required
              placeholder="••••••••"
              value={password}
              onChange={handleInputPassword}
            />
            <span className="register__form-error">Что-то пошло не так...</span>
          </label>
        </div>
        <div className="register__wrapper">
          <button type="submit" className="register__button">
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
