import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from '../Header/Header';


function Main(props) {
  return (
    <>
        <Header isAuth={true} />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      
    </>
  );
}

export default Main;
