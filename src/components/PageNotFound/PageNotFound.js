import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleBack = () => {
    isLoggedIn ? navigate(-2) : navigate('/');
  };

  return (
    <section className="notfound">
      <div className="notfound__container">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__subtitle">Страница не найдена</p>
        <button className="notfound__back" onClick={handleBack}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default PageNotFound;
