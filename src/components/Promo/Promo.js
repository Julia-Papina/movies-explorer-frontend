import "./Promo.css";
import logoPromo from "../../images/text__COLOR_landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__container">
          <div>
            <h1 className="promo__title">
              Учебный проект студента факультета Веб&#8209;разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <div>
            <img
              src={logoPromo}
              alt="Логотип промо - планета web"
              className="promo__logo"
            />
          </div>
        </div>
        <nav className="promo__nav">
          <a className="promo__link" href="#about-project">
            Узнать больше
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Promo;
