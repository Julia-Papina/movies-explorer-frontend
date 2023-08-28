import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <h2 className="about-project__header">О проекте</h2>
        <div className="about-project__container">
          <div className="about-project__text">
            <p className="about-project__title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__time">
            <p className="about-project__title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__weeks">
            <div className="about-project__weeks-one">1 неделя</div>
            <div className="about-project__weeks-four">4 недели</div>
        </div>

        <div className="about-project__stack">
            <div className="about-project__stack-backend">Back-end</div>
            <div className="about-project__stack-frontend">Front-end</div>         
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
