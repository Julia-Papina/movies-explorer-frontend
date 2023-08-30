
import React, { useContext } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <section className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
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
              defaultValue={currentUser.name}
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
              defaultValue={currentUser.email}
              required
            />
          </div>
          <span className="profile__input-error">Произошла ошибка...</span>
        </form>

        <button type="button" className="profile__register">
          Редактировать
        </button>
        <Link to="/" className="profile__exit" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}

export default Profile;