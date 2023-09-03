import React, { useContext } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { validateEmail, validateName } from "../../utils/validator";
import { useValidationForm } from "../../hooks/useValidationForm";

function Profile({ onSignOut, onUpdateProfile, serverError, isOkRequest }) {
  const { values, handleChange, setValues } = useValidationForm();
  const currentUser = useContext(CurrentUserContext);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showSaveButton, setShowSaveButton] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(values);
    setShowSaveButton(false);
    setShowSuccessMessage(true);
  };

  const handleShowSaveButton = (e) => {
    e.preventDefault();
    setShowSaveButton(true);
    setShowSuccessMessage(false);
  };

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  return (
    <>
      <section className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
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
              onChange={handleChange}
              disabled={!showSaveButton}
            />
          </div>
          <span className={`profile__input-error profile__input-error_active`}>
            {validateName(values.name).error}
          </span>

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
              onChange={handleChange}
              disabled={!showSaveButton}
            />
          </div>
          <span className={`profile__input-error profile__input-error_active`}>
            {validateEmail(values.email).error}
          </span>

          <div className="profile__buttons-wrapper">
            {isOkRequest ? (
              <span
                className={`profile__success-message ${
                  showSuccessMessage ? "" : "profile__success-message_disabled"
                }`}
              >
                Обновление данных прошло успешно!
              </span>
            ) : (
              <span
                className={`profile__error-text ${
                  serverError ? "" : "profile__error-text_disabled"
                }`}
              >
                Произошла ошибка на стороне сервера. Пожалуйста, попробуйте ещё
                раз.
              </span>
            )}

            {showSaveButton ? (
              <button
                type="submit"
                onSubmit={handleSubmit}
                className={`profile__save ${
                  (values.name === currentUser.name &&
                    values.email === currentUser.email) ||
                  !validateName(values.name).activeButton ||
                  !validateEmail(values.email).activeButton
                    ? "profile__save_disabled"
                    : ""
                }`}
              >
                Сохранить
              </button>
            ) : (
              <button
                type="button"
                className="profile__register"
                onClick={handleShowSaveButton}
              >
                Редактировать
              </button>
            )}

            <Link to="/" className="profile__exit" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
