import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__header">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link
              className="portfolio__link"
              target="_blank"
              to={"https://julia-papina.github.io/how-to-learn/"}
            >
              Статичный сайт
              <span className="portfolio__arrow">↗</span>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              className="portfolio__link"
              target="_blank"
              to={"https://julia-papina.github.io/russian-travel/"}
            >
              Адаптивный сайт
              <span className="portfolio__arrow">↗</span>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              className="portfolio__link"
              target="_blank"
              to={"https://julia-papina.github.io/react-mesto-auth/"}
            >
              Одностраничное приложение
              <span className="portfolio__arrow">↗</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
