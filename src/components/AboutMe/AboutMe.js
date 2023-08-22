import { Link } from "react-router-dom";
import "./AboutMe.css";
import photoAuthor from "../../images/photoAuthor.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__text">
          <p className="about-me__name">Юлия</p>
          <p className="about-me__info">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__description">
            Я родилась и в данный момент живу в городе Липецке. Имею два высших
            образования: экономическое и музыкальное. Профессионально занимаюсь
            музыкой. Год назад захотела получить новую профессию
            веб-разработчика и это полностью увлекло меня в мир it и
            веб-разработки. В планах дальнейшее изучение технологий, таких как
            TypeScript и Redux, продолжить изучение React, написание
            пет-проектов и поиск работы фронтенд-разработчиком.
          </p>
          <Link
            className="about-me__link"
            target="_blank"
            to={"https://github.com/Julia-Papina"}
          >
            Github
          </Link>
        </div>
        <img
          className="about-me__photo"
          alt="Фото студента"
          src={photoAuthor}
        />
      </div>
    </section>
  );
}

export default AboutMe;
