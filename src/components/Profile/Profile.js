import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile({ name = "Виталий", email = "pochta@yandex.ru" }) {
  return (
    <>
      <Header isAuth={true} />
      <section className="profile">
        <h2 className="profile__header">Привет, Виталий!</h2>
        <form className="profile__form" noValidate>
          <div className="profile__input-wrapper">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              name="name"
              id="name"
              autoComplete="off"
              type="name"
              minLength="2"
              maxLength="30"
              defaultValue={"Виталий" || ""}
              required
            />
          </div>
          <span className="profile__input-error">Произошла ошибка...</span>

          <div className="profile__input-wrapper">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              name="email"
              id="email"
              autoComplete="off"
              type="email"
              minLength="2"
              maxLength="30"
              defaultValue={"pochta@yandex.ru" || ""}
              required
            />
          </div>
          <span className="profile__input-error">Произошла ошибка...</span>
        </form>

        <button type="button" className="profile__register">
          Редактировать
        </button>
        <Link to="/signin" className="profile__exit">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}

export default Profile;
