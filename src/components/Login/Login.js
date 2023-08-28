import "./Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }
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
              value={email}
              onChange={handleInputEmail}
            />
          </label>

          <label className="login__form-label" htmlFor="password">
            Пароль
            <input
              className="login__form-input"
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
          </label>
        </div>
        <div className="login__wrapper">
          <button type="submit" className="login__button">
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
